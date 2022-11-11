# label-studio安装过程中遇到的问题和解决办法

如果报: ERROR: After October 2020 you may experience errors when installing or updating packages

解决方法: 在pip命令中加入–use-feature=2020-resolver参数就可以了, 比如pip install xxx --use-feature=2020-resolver

```sh
    pip install --use-feature=2020-resolver -e .
```

如果label-studio的tag是v1.5会提示升级至1.6
label-studio目录下执行

```sh
pip install -U label-studio
```

'NODE_ENV' 不是内部或外部命令，也不是可运行的程序 或批处理文件
解决方案：安装cross-env：再在NODE_ENV=xxxxxxx前面添加cross-env

```sh
npm install cross-env -–save-dev
```
