# 多账户管理

* 生成对应的ssh
  + 生成第一个ssh ssh-keygen -t rsa -C mail@qq.com
  + 生成第二个ssh ssh-keygen -t rsa -C mail@qq.com
  + 将两个公钥放在对应的sshkey上
* 添加config

  配置描述

    

``` 
    HostName 　　　　　　　   这个是真实的域名地址
    IdentityFile 　　　　　　　  这里是id_rsa的地址
    PreferredAuthentications   配置登录时用什么权限认证--可设为publickey,password publickey,keyboard-interactive等
    User 　　　　　　　　　　　配置使用用户名
    ```

  具体配置

    

``` 
    # 配置github.com
    Host github.com                 
        HostName github.com
        IdentityFile C:\Users\Lin\.ssh\id_rsa_github
        PreferredAuthentications publickey
        User zhanglin

    # 配置git.uinnova.com
    Host git.uinnova.com
        HostName git.uinnova.com
        IdentityFile C:\\Users\\popfisher\\.ssh\\id_rsa_uinnova
        PreferredAuthentications publickey
        User zhanglin
    ```

[参考地址: ](https://www.cnblogs.com/popfisher/p/5731232.html)https://www.cnblogs.com/popfisher/p/5731232.html

