#	运行方法
##	库的安装
直接复制这两行代码，然后粘贴到命令行回车，等待下载和安装后端依赖库即可
pip install tensorflow keras pandas numpy flask matplotlib mplfinance akshare secrets json
pip install -U flask-cors
然后打开前端主目录，打开cmd，输入npm install，等待安装前端依赖库。
##	主函数运行方法
在项目主目录下，打开cmd；或者直接打开cmd，输入cd+项目主目录路径。然后输入python main.py即可。或者打开Pycharm，打开main.py后点击右上角的运行键。之后，在终端就会输出预测的十条数据。同时，main中还有可视化历史、重新训练模型loss和拟合曲线的功能，取消注释后运行即可。
 
##	后端运行方法
同上，可以在后端主文件夹的命令行输入python Flask，，运行Flask.py即可运行后端。需查看运行的端口是否为127.0.0.1:5000，若不是可能是遇到了某些突发情况，可联系作者来进行修正。
 
##	前端运行方法
运行好后端后即可继续运行前端。在前端项目主目录下，打开cmd；或者直接打开cmd，输入cd+项目主目录路径。然后输入npm install回车，即可安装前端需要的包，下载安装完毕后输入npm run dev回车即可。然后可以在浏览器的网址栏输入localhost:5173来访问软件，若不是5173，则可能发生了某些错误，把对应的端口号改成终端显示的即可。如果无法访问，请及时联系作者进行修正。
