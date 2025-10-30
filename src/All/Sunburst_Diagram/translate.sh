#!/bin/bash

# 批量翻译脚本 - 将所有中文咖啡术语替换为英文

FILES="sunburst_highlighting_1.html sunburst_highlighting_2.html sunburst_highlighting_3.html sunburst_staging.html sunburst_staging_1.html sunburst_staging_2.html sunburst_staging_3.html"

for file in $FILES; do
    echo "Processing $file..."
    sed -i '' \
        -e "s/ECharts 咖啡风味轮旭日图 - 中文版/ECharts Coffee Flavor Wheel Sunburst Chart - English Version/g" \
        -e "s/name: '菠萝'/name: 'Pineapple'/g" \
        -e "s/name: '葡萄'/name: 'Grape'/g" \
        -e "s/name: '苹果'/name: 'Apple'/g" \
        -e "s/name: '桃子'/name: 'Peach'/g" \
        -e "s/name: '梨'/name: 'Pear'/g" \
        -e "s/name: '柑橘类'/name: 'Citrus Fruit'/g" \
        -e "s/name: '葡萄柚'/name: 'Grapefruit'/g" \
        -e "s/name: '橙子'/name: 'Orange'/g" \
        -e "s/name: '柠檬'/name: 'Lemon'/g" \
        -e "s/name: '青柠'/name: 'Lime'/g" \
        -e "s/name: '酸味\/\\\\n发酵类'/name: 'Sour\/\\\\nFermented'/g" \
        -e "s/name: '酸'/name: 'Sour'/g" \
        -e "s/name: '酸香'/name: 'Sour Aromatics'/g" \
        -e "s/name: '醋酸'/name: 'Acetic Acid'/g" \
        -e "s/name: '丁酸'/name: 'Butyric Acid'/g" \
        -e "s/name: '异戊酸'/name: 'Isovaleric Acid'/g" \
        -e "s/name: '柠檬酸'/name: 'Citric Acid'/g" \
        -e "s/name: '苹果酸'/name: 'Malic Acid'/g" \
        -e "s/name: '酒精\/\\\\n发酵'/name: 'Alcohol\/\\\\nFermented'/g" \
        -e "s/name: '酒味'/name: 'Winey'/g" \
        -e "s/name: '威士忌味'/name: 'Whiskey'/g" \
        -e "s/name: '发酵味'/name: 'Fermented'/g" \
        -e "s/name: '过熟'/name: 'Overripe'/g" \
        -e "s/name: '绿色\/\\\\n植物类'/name: 'Green\/\\\\nVegetative'/g" \
        -e "s/name: '橄榄油'/name: 'Olive Oil'/g" \
        -e "s/name: '生鲜'/name: 'Raw'/g" \
        -e "s/name: '绿色\/\\\\n植物'/name: 'Green\/\\\\nVegetative'/g" \
        -e "s/name: '未熟'/name: 'Under-ripe'/g" \
        -e "s/name: '豌豆荚'/name: 'Peapod'/g" \
        -e "s/name: '新鲜'/name: 'Fresh'/g" \
        -e "s/name: '深绿色'/name: 'Dark Green'/g" \
        -e "s/name: '植物味'/name: 'Vegetative'/g" \
        -e "s/name: '干草味'/name: 'Hay-like'/g" \
        -e "s/name: '香草味'/name: 'Herb-like'/g" \
        -e "s/name: '豆类'/name: 'Beany'/g" \
        -e "s/name: '其他'/name: 'Other'/g" \
        -e "s/name: '纸质\/霉味'/name: 'Papery\/Musty'/g" \
        -e "s/name: '不新鲜'/name: 'Stale'/g" \
        -e "s/name: '纸板味'/name: 'Cardboard'/g" \
        -e "s/name: '纸味'/name: 'Papery'/g" \
        -e "s/name: '木质'/name: 'Woody'/g" \
        -e "s/name: '发霉\/潮湿'/name: 'Moldy\/Damp'/g" \
        -e "s/name: '霉味\/灰尘味'/name: 'Musty\/Dusty'/g" \
        -e "s/name: '霉味\/土味'/name: 'Musty\/Earthy'/g" \
        -e "s/name: '动物味'/name: 'Animalic'/g" \
        -e "s/name: '肉\/汤味'/name: 'Meaty\/Brothy'/g" \
        -e "s/name: '酚类'/name: 'Phenolic'/g" \
        -e "s/name: '化学品'/name: 'Chemical'/g" \
        -e "s/name: '苦'/name: 'Bitter'/g" \
        -e "s/name: '咸'/name: 'Salty'/g" \
        -e "s/name: '药味'/name: 'Medicinal'/g" \
        -e "s/name: '石油味'/name: 'Petroleum'/g" \
        -e "s/name: '臭鼬味'/name: 'Skunky'/g" \
        -e "s/name: '橡胶味'/name: 'Rubber'/g" \
        -e "s/name: '烘焙类'/name: 'Roasted'/g" \
        -e "s/name: '烟斗丝'/name: 'Pipe Tobacco'/g" \
        -e "s/name: '烟草'/name: 'Tobacco'/g" \
        -e "s/name: '烧焦'/name: 'Burnt'/g" \
        -e "s/name: '辛辣'/name: 'Acrid'/g" \
        -e "s/name: '灰烬味'/name: 'Ashy'/g" \
        -e "s/name: '烟熏味'/name: 'Smoky'/g" \
        -e "s/name: '深焙'/name: 'Brown Roast'/g" \
        -e "s/name: '谷物'/name: 'Grain'/g" \
        -e "s/name: '谷粒'/name: 'Grain'/g" \
        -e "s/name: '麦芽'/name: 'Malt'/g" \
        -e "s/name: '香料类'/name: 'Spices'/g" \
        -e "s/name: '刺激性'/name: 'Pungent'/g" \
        -e "s/name: '胡椒'/name: 'Pepper'/g" \
        -e "s/name: '棕色香料'/name: 'Brown Spice'/g" \
        -e "s/name: '茴香'/name: 'Anise'/g" \
        -e "s/name: '肉豆蔻'/name: 'Nutmeg'/g" \
        -e "s/name: '肉桂'/name: 'Cinnamon'/g" \
        -e "s/name: '丁香'/name: 'Clove'/g" \
        -e "s/name: '坚果\/\\\\n可可类'/name: 'Nutty\/\\\\nCocoa'/g" \
        -e "s/name: '坚果'/name: 'Nutty'/g" \
        -e "s/name: '花生'/name: 'Peanuts'/g" \
        -e "s/name: '榛子'/name: 'Hazelnut'/g" \
        -e "s/name: '杏仁'/name: 'Almond'/g" \
        -e "s/name: '可可'/name: 'Cocoa'/g" \
        -e "s/name: '巧克力'/name: 'Chocolate'/g" \
        -e "s/name: '黑巧克力'/name: 'Dark Chocolate'/g" \
        -e "s/name: '甜味类'/name: 'Sweet'/g" \
        -e "s/name: '红糖'/name: 'Brown Sugar'/g" \
        -e "s/name: '糖蜜'/name: 'Molasses'/g" \
        -e "s/name: '枫糖浆'/name: 'Maple Syrup'/g" \
        -e "s/name: '焦糖'/name: 'Caramelized'/g" \
        -e "s/name: '蜂蜜'/name: 'Honey'/g" \
        -e "s/name: '香草'/name: 'Vanilla'/g" \
        -e "s/name: '香兰素'/name: 'Vanillin'/g" \
        -e "s/name: '整体甜感'/name: 'Overall Sweet'/g" \
        -e "s/name: '甜香'/name: 'Sweet Aromatics'/g" \
        "$file"
    echo "Done processing $file"
done

echo "All files translated!"

