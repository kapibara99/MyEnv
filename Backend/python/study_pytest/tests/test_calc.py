from python.study_pytest.main.calc import Calc


def test_add_01() -> None:
  assert Calc(9, 2).add() == 11


def test_add_02() -> None:
  assert Calc(-9, 2).add() == -7


def test_dif_01() -> None:
  assert Calc(9, 2).dif() == 7


def test_dif_02() -> None:
  assert Calc(-9, 2).dif() == -11


def test_seki_01() -> None:
  assert Calc(9, 2).seki() == 18


def test_seki_02() -> None:
  assert Calc(-9, 2).seki() == -18


def test_shou_01() -> None:
  assert Calc(9, 2).shou() == 4.5


def test_shou_02() -> None:
  assert Calc(-9, 2).shou() == -4.5


if __name__ == "__main__":
  test_add_01()
  test_add_02()
  test_dif_01()
  test_dif_02()
  test_seki_01()
  test_seki_02()
  test_shou_01()
  test_shou_02()
