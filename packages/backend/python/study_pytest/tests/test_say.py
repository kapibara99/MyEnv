from python.study_pytest.main.say import Foo, Hoge


def test_foo_say() -> None:
  assert Foo().say() == "foo"


def test_foo_say2() -> None:
  assert Foo().say2() == "foo2"


def test_hoge_say() -> None:
  assert Hoge().say() == "hoge"


def test_hoge_say2() -> None:
  assert Hoge().say2() == "hoge2"


if __name__ == "__main__":
  test_foo_say()
  test_foo_say2()
  test_hoge_say()
  test_hoge_say2()
