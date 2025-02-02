# python development

current version 3.11

## Python Basic Environment

現在の環境の pip list を txt ファイルにコピーする
`$ pip freeze > requirements.txt`

txt ファイルからインストールを行う
`$ pip install -r requirements.txt`

pip パッケージのリストを保存する
`pip list > requirements.txt`

### lint and format (ruff)

フォーマット
`ruff format .`

型などのチェック
`ruff check --fix .`

## scraping

芸能人の出演予定を取得

`python3 demo.py`

### Nuitka(パッケージ化: exe or app)

`nuitka --onefile --standalone --macos-create-app-bundle --output-dir=build demo.py`

`build/demo.app/contents/MacOS/demo`

## batch sample project

## pytest sample

`pytest -v --cov=main --cov-report=term-missing`

`pytest -v --cov=main --cov-report=html`

## DB Connect (ex:mariaDB)

### env build (M1 Mac book air case)

参考(https://qiita.com/ynack/items/4709b77d42847823cdb3)

#### install mariaDB from brew

`$ brew install mariadb`

`$ brew services start mariadb`

`$ brew services stop mariadb`

- ※実行しているかどうかの確認 -> `ps -ax | grep mysql`
- ※再起動 -> `$ brew services restart mariadb`

#### mysql starter commands

`mysql -u "username" -p`

ユーザにログインして始動する。最初、root でログインし、以下を行う

現在登録されているユーザを確認し、任意のユーザを追加する
`select User, Host,Password from mysql.user;` → `GRANT ALL ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password';`

port 確認
`show variables like 'port';`

host 確認
`show variables like 'hostname';`

その他コマンドなど

- [mariaDB 公式チートシート](https://mariadb.com/wp-content/uploads/2021/08/mariadb-standard-developer_cheat-sheet_1113.pdf)

#### charset and connection setting

MariaDB には、utf8mb4_0900_ai_ci のサポートがないので、別途以下で統一する

```etc/my.cnf
[mysqld]
character-set-server=utf8mb4
[client]
default-character-set=utf8mb4
```

#### python db connector

`mysql-connector-python` => 採用

不採用 => `mysqlclient`
ベンチマーク面が良いため、導入を検討したが、homebrew のディレクトリ配置が良くない？
`libmysqlclient.*.dylib`がうまく取り入れられないので、断念

#### SQL Editor

mac -> [Sequel Ace](https://apps.apple.com/us/app/sequel-ace/id1518036000)

windows -> [A5M2](https://a5m2.mmatsubara.com/)
