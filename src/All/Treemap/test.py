import pandas as pd

# --- 1. 加载 Superstore 数据 ---
try:
    # 使用 'latin1' 编码以避免读取错误
    df = pd.read_csv('Sample - Superstore.csv', encoding='latin1')
    print("成功加载 'Sample - Superstore.csv'.")
except Exception as e:
    print(f"加载文件时出错: {e}")
    exit()

# --- 2. 处理订单日期数据 ---
# 将 Order Date 转换为 datetime 格式
df['Order Date'] = pd.to_datetime(df['Order Date'])

# 提取时间维度
df['Year'] = df['Order Date'].dt.year
df['Month'] = df['Order Date'].dt.month
df['Quarter'] = df['Order Date'].dt.quarter
df['Month_Name'] = df['Order Date'].dt.strftime('%B')  # 月份名称
df['Quarter_Name'] = 'Q' + df['Quarter'].astype(str)   # 季度名称

print(f"数据时间范围: {df['Order Date'].min()} 到 {df['Order Date'].max()}")
print(f"包含年份: {sorted(df['Year'].unique())}")
print(f"包含季度: {sorted(df['Quarter_Name'].unique())}")

# --- 3. 为Treemap聚合数据 (包含时间维度) ---
# 创建包含时间信息的聚合数据
treemap_data_with_time = df.groupby(['Category', 'Sub-Category', 'Year', 'Month', 'Quarter', 'Month_Name', 'Quarter_Name'])['Sales'].sum().reset_index()

# 为了与D3代码兼容，重命名列名
treemap_data_with_time.rename(columns={
    'Category': 'level1',
    'Sub-Category': 'level2',
    'Sales': 'value'
}, inplace=True)

# --- 4. 创建基础聚合数据（不含时间维度，用于静态treemap） ---
treemap_data = df.groupby(['Category', 'Sub-Category'])['Sales'].sum().reset_index()
treemap_data.rename(columns={
    'Category': 'level1',
    'Sub-Category': 'level2',
    'Sales': 'value'
}, inplace=True)

# --- 5. 保存为CSV文件 ---
# 保存基础聚合数据
output_filename = 'superstore_treemap_data.csv'
treemap_data.to_csv(output_filename, index=False)

# 保存包含时间维度的详细数据
temporal_filename = 'superstore_temporal_data.csv'
treemap_data_with_time.to_csv(temporal_filename, index=False)

print(f"\n数据处理完成！")
print(f"已生成基础数据文件: '{output_filename}'")
print(f"已生成时间数据文件: '{temporal_filename}'")

print("\n基础数据文件内容预览:")
print(treemap_data.head())

print(f"\n时间数据文件内容预览:")
print(treemap_data_with_time.head())

print(f"\n数据统计:")
print(f"总记录数: {len(df)}")
print(f"基础聚合后记录数: {len(treemap_data)}")
print(f"时间聚合后记录数: {len(treemap_data_with_time)}")
print(f"总销售额: ${df['Sales'].sum():,.2f}")