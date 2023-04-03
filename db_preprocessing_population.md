## Data preprocessing

* Link to the Google Drive that holds the raw data and cleaned data:
https://drive.google.com/drive/folders/1CH5yhJ9yjdeSt20fPvN9wPuDYRPxqw8_?usp=share_link  

* Link to the Google Colab notebook used for data cleaning/preprocessing:
https://colab.research.google.com/drive/1piIgc-9TAsf45JEb9J-RB1wIh1plnnNh?usp=sharing 


## Database creation/population 

    CREATE DATABASE PHILLY_DB;
    USE PHILLY_DB;

    CREATE TABLE Property (
        object_id bigint,
        location varchar(255),
        market_value float(2),
        building_code_description varchar(255),
        PRIMARY KEY (object_id)
    );

    CREATE TABLE Crime (
        dc_key bigint,
        location_block varchar(255),
        text_general_code varchar(255),
        dispatch_date varchar(12),
        dispatch_time varchar(10),
        PRIMARY KEY (dc_key)
    );

