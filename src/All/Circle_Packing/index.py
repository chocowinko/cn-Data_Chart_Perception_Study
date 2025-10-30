import pandas as pd

# --- 步骤 1: 加载数据集 ---
# 加载2023年人均排放量数据
df_emissions_2023 = pd.read_csv('2023年全球各国人均温室气体排放量.csv')
# 加载2013年人均排放量数据
df_emissions_2013 = pd.read_csv('2013人均排放量.csv')
# 加载联合国区域代码数据，注意分隔符是分号';'
df_map = pd.read_csv('UNSD_Methodology.csv', delimiter=';')

# --- 步骤 2: 清理和准备区域映射文件 ---
# 根据之前的分析，使用包含中英文和特殊字符的精确列名
correct_continent_col = 'Region Name\xa0\xa0地区名称'
correct_subregion_col = 'Sub-region Name\xa0\xa0次区域名称'
correct_country_col = 'Country or Area\xa0\xa0国家或地区'

# 选择我们需要的列
df_map_cleaned = df_map[[correct_continent_col, correct_subregion_col, correct_country_col]].copy()

# 将列名重命名为简洁的英文，方便后续使用
df_map_cleaned.columns = ['continent', 'sub_region', 'country']

# 清理数据：丢弃没有大洲信息的行，并将空的次区域填充为'N/A'
df_map_cleaned.dropna(subset=['continent'], inplace=True)
df_map_cleaned['sub_region'].fillna('N/A', inplace=True)


# --- 步骤 3: 清理和准备排放量文件 ---
# 处理2023年数据
df_emissions_2023.columns = ['country', 'year', 'emissions']

# 处理2013年数据 - 注意2013年数据格式不同，第一列为空
df_emissions_2013.columns = ['empty', 'country', 'year', 'emissions']
df_emissions_2013 = df_emissions_2013.drop('empty', axis=1)  # 删除空列

# 合并两年的数据
df_emissions = pd.concat([df_emissions_2023, df_emissions_2013], ignore_index=True)

# 定义并移除所有非国家的统计行
non_countries = [
    'Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America', 'World',
    'European Union (27)', 'High-income countries', 'Low-income countries',
    'Lower-middle-income countries', 'Upper-middle-income countries'
]
df_emissions_cleaned = df_emissions[~df_emissions['country'].isin(non_countries)].copy()


# --- 步骤 4: 合并两个数据集 ---
# 使用 inner merge，只保留在两个文件中都存在的国家
df_merged = pd.merge(df_emissions_cleaned, df_map_cleaned, on='country', how='inner')


# --- 步骤 5: 筛选出亚洲和欧洲的数据 ---
target_continents = ['Asia', 'Europe']
df_final = df_merged[df_merged['continent'].isin(target_continents)].copy()

# 重新排列列的顺序，使其更符合逻辑
df_final = df_final[['continent', 'sub_region', 'country', 'year', 'emissions']]

# 对结果进行排序
df_final.sort_values(by=['continent', 'sub_region', 'country', 'year'], inplace=True)


# --- 步骤 6: 保存并显示结果 ---
output_filename = 'asia_europe_emissions_hierarchical.csv'
df_final.to_csv(output_filename, index=False)

print(f"成功为亚洲和欧洲创建了包含 {len(df_final)} 条记录的分层数据集。")
print(f"数据包含 {df_final['country'].nunique()} 个国家，覆盖 {sorted(df_final['year'].unique())} 年份。")
print(f"结果已保存至 '{output_filename}'。")
print("\n最终数据预览:")
print(df_final.head(10))
print(f"\n数据统计:")
print(f"2013年记录数: {len(df_final[df_final['year'] == 2013])}")
print(f"2023年记录数: {len(df_final[df_final['year'] == 2023])}")