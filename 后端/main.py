import data_preprocess
import data_predict
import model_train
import visual

from keras.models import load_model
from keras.losses import MeanSquaredError as mse

import pandas as pd

if __name__ == '__main__':
    
    #读取数据，并进行预处理
    filename = 'stock_data.csv'
    df, scalers = data_preprocess.data_preprocess(filename)
    print(scalers.values())
    look_back = 80
    
    #分割数据集
    train, test = data_preprocess.train_test_partition(df)
    X_train, y_train = data_preprocess.data_split(train.values, look_back)
    X_test, y_test = data_preprocess.data_split(test.values, look_back)
    
    # # 训练模型，并可视化（可选）
    # history = model_train.model_train(X_train, y_train, X_test, y_test)
    # visual.history_visual(history)
    
    #加载模型
    custom_objects = {'mse': mse}
    model = load_model('股票数据预测.h5', custom_objects=custom_objects)
    model.compile(loss=mse, optimizer='Nadam')
    
    # #可视化模型在已有数据上的拟合效果（可选）
    # y_pred_train, y_true_train = data_predict.varify_predict(X_train, y_train, scalers)
    # y_pred_test, y_true_test = data_predict.varify_predict(X_test, y_test, scalers)
    # visual.plot_predictions(y_true_train, y_pred_train, y_true_test, y_pred_test)
    
    #预测未来10天的数据
    last_part = df.tail(look_back).values
    last_part = pd.DataFrame(last_part, columns=df.columns)
    last_part = last_part.values.reshape(1, last_part.shape[0], last_part.shape[1])
    future = data_predict.predict_data(model, last_part, days=10)
    data = data_preprocess.inverse_scaling(future, scalers)
    print(data)