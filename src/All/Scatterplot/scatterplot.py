import pandas as pd

try:
    # 加载您的原始数据文件
    df = pd.read_csv("PRSA_Data_Changping_20130301-20170228.csv")

    def preprocess_and_save_year(df, year, filename):
        """筛选指定年份的数据，处理后保存为CSV"""
        df_year = df[df['year'] == year].copy()
        
        if df_year.empty:
            print(f"警告: 在数据中找不到 {year} 年的数据。")
            return

        df_year['datetime'] = pd.to_datetime(df_year[['year', 'month', 'day', 'hour']])
        df_year['date'] = df_year['datetime'].dt.date
        
        df_year['PM2.5'] = df_year['PM2.5'].interpolate(method='linear', limit_direction='both')
        df_year['O3'] = df_year['O3'].interpolate(method='linear', limit_direction='both')
        
        daily_df = df_year.groupby('date')[['PM2.5', 'O3']].mean().reset_index()
        
        daily_df['day_of_year'] = pd.to_datetime(daily_df['date']).dt.dayofyear
        
        daily_df.to_csv(filename, index=False)
        print(f"成功生成文件: {filename}")

    # 为2014年和2016年生成文件
    preprocess_and_save_year(df, 2014, "daily_2014.csv")
    preprocess_and_save_year(df, 2016, "daily_2016.csv")

except FileNotFoundError:
    print("错误: 原始数据文件 'PRSA_Data_Changping_20130301-20170228.csv' 未找到。请确保它和本脚本在同一个文件夹中。")
except Exception as e:
    print(f"处理过程中发生错误: {e}")