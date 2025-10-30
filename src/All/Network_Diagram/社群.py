# process_final_routed_graph.py
# 最终版：模拟层级边缘捆绑效果

import pandas as pd
import networkx as nx
import community as community_louvain
from collections import defaultdict
import numpy as np

# --- 配置区 ---
INPUT_CSV_PATH = "PSI*班级内部接触数据集.csv" 
SOURCE_COLUMN = "学生1" 
TARGET_COLUMN = "学生2"
OUTPUT_CSV_PATH = "network_final_routed.csv"
RANDOM_SEED = 42
# ----------------

try:
    # 1. 计算频率和加权社群 (与之前相同)
    print("步骤 1/4: 正在计算频率和加权社群...")
    df = pd.read_csv(INPUT_CSV_PATH)
    df_normalized = pd.DataFrame(np.sort(df[[SOURCE_COLUMN, TARGET_COLUMN]].values, axis=1), columns=['source', 'target'])
    frequency_df = df_normalized.groupby(['source', 'target']).size().reset_index(name='weight')
    
    G = nx.from_pandas_edgelist(frequency_df, 'source', 'target', edge_attr='weight')
    partition = community_louvain.best_partition(G, weight='weight', random_state=RANDOM_SEED)
    print("         - 分析完成。")

    # 2. 准备节点数据，并创建“代理”节点
    print("步骤 2/4: 正在创建节点和社群代理...")
    nodes_data = [{'id': str(node), 'group': group_id, 'type': 'person'} for node, group_id in partition.items()]
    
    community_ids = set(partition.values())
    for comm_id in community_ids:
        # 代理节点的ID格式为 'proxy_社群ID'
        nodes_data.append({'id': f'proxy_{comm_id}', 'group': comm_id, 'type': 'proxy'})
    
    nodes_df = pd.DataFrame(nodes_data)

    # 3. 准备边数据，区分社内和社外路由
    print("步骤 3/4: 正在区分并重路由连接...")
    edges_data = []
    
    # 添加社内连接
    for _, row in frequency_df.iterrows():
        source_group = partition[row['source']]
        target_group = partition[row['target']]
        if source_group == target_group:
            edges_data.append({
                'source': str(row['source']), 'target': str(row['target']), 
                'weight': row['weight'], 'type': 'intra-community'
            })

    # 重路由社外连接
    inter_community_edges = frequency_df[frequency_df['source'].map(partition) != frequency_df['target'].map(partition)]
    for _, row in inter_community_edges.iterrows():
        source_group = partition[row['source']]
        target_group = partition[row['target']]
        
        # 线路第一段: 源节点 -> 源社群代理
        edges_data.append({
            'source': str(row['source']), 'target': f'proxy_{source_group}', 
            'weight': row['weight'], 'type': 'routing'
        })
        # 线路第二段: 目标节点 -> 目标社群代理 (方向不重要，物理引擎会处理)
        edges_data.append({
            'source': str(row['target']), 'target': f'proxy_{target_group}',
            'weight': row['weight'], 'type': 'routing'
        })

    # 计算并添加代理之间的主干道连接
    inter_community_edges['g1'] = np.minimum(inter_community_edges['source'].map(partition), inter_community_edges['target'].map(partition))
    inter_community_edges['g2'] = np.maximum(inter_community_edges['source'].map(partition), inter_community_edges['target'].map(partition))
    meta_edges = inter_community_edges.groupby(['g1', 'g2'])['weight'].sum().reset_index()
    for _, row in meta_edges.iterrows():
        edges_data.append({
            'source': f'proxy_{row["g1"]}', 'target': f'proxy_{row["g2"]}',
            'weight': row['weight'], 'type': 'inter-community-main'
        })
        
    edges_df = pd.DataFrame(edges_data)

    # 4. 合并并保存为单个文件
    print("步骤 4/4: 正在合并节点和边数据并保存...")
    # 这里我们只输出一个包含所有边信息的CSV，节点信息由HTML端动态生成
    edges_df['source_group'] = edges_df['source'].apply(lambda x: partition[int(x)] if 'proxy' not in str(x) else int(str(x).split('_')[1]))
    nodes_df.to_csv('nodes_final.csv', index=False)
    edges_df.to_csv(OUTPUT_CSV_PATH, index=False)
    
    print(f"\n任务完成！已生成最终的可视化数据文件: '{OUTPUT_CSV_PATH}' 和 'nodes_final.csv'")

except Exception as e:
    print(f"发生错误: {e}")