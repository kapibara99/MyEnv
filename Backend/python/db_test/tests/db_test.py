from main.db import sql_execute, multi_sql_execute


def test_sql_execute() -> None:
  cur = sql_execute("select * from learning.test;")
  assert len(cur) == 5


def multi_process_sample(data_id: int) -> None:
  return sql_execute(f"select * from learning.test where id = {data_id};", dict_cur=True)


def test_multi_sql_execute() -> None:
  id_ary = [1, 2, 3, 4, 5]
  cur = multi_sql_execute(id_ary, multi_process_sample)
  assert len(cur) == 5


if __name__ == "__main__":
  test_sql_execute()
  test_multi_sql_execute()
