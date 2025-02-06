from main.db import sql_execute


def test_sql_execute() -> None:
  cur = sql_execute("select * from learning.test;")
  print(cur)
  assert len(cur) == 5


if __name__ == "__main__":
  test_sql_execute()
