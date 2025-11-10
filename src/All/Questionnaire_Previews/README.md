# 问卷预览图表文件夹

## 📁 文件夹说明

这个文件夹包含**所有问卷页（QuestionnairePart3.vue）使用的预览图表文件**。

**重要：这些文件与实验页的图表文件是完全独立的！**

## ✅ 包含的文件 (9个)

### 高亮策略 (Highlighting)
1. `heatmap_highlighting_preview.html` - 热力图 + 高亮
2. `sankey_highlighting_preview.html` - 桑基图 + 高亮  
3. `sunburst_highlighting_preview.html` - 旭日图 + 高亮

### 分步策略 (Staging)
4. `scatterplot_staging_preview.html` - 散点图 + 分阶段
5. `heatmap_staging_preview.html` - 热力图 + 分阶段
6. `circle_packing_staging_2_preview.html` - 圆堆积图 + 分阶段

### 追踪策略 (Tracing)
7. `line_graph_tracing_preview.html` - 折线图 + 追踪
8. `scatterplot_tracing_preview.html` - 散点图 + 追踪
9. `network_tracing_preview.html` - 网络图 + 追踪

## 🎯 用途

- **专门用于问卷页的小预览图**
- 可能需要隐藏文字标签、调整尺寸和位置
- **不会影响实验页的图表显示**

## ⚠️ 注意事项

1. **修改这些文件只影响问卷页**，不会影响正式实验页
2. 这些文件的CSV数据路径已更新为相对路径（如 `../Heatmap/xxx.csv`）
3. 如果需要调整预览效果（隐藏标签、调整大小等），只需修改这个文件夹里的文件
4. 原始文件仍保留在各自的图表文件夹中作为备份

## 🔧 数据文件路径映射

每个preview文件引用的数据文件：
- Heatmap → `../Heatmap/moscow_copenhagen_tem.csv`
- Sankey → `../Sankey_Diagram/energy.csv`
- Circle Packing → `../Circle_Packing/asia_europe_emissions_hierarchical.csv`
- Line Graph → `../Line_Graph/销售额.csv`
- Scatterplot Staging → `../Scatterplot/PRSA_Data_Changping_20130301-20170228.csv`
- Scatterplot Tracing → `../Scatterplot/daily_2014.csv` + `daily_2016.csv`
- Network → `../Network_Diagram/network_data_for_broadcast.json` + `layout_positions.json` + `network_nodes.csv`
