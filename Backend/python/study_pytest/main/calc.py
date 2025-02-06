class Calc:
  def __init__(self, a: int, b: int):
    self.a = a
    self.b = b

  def add(self) -> int:
    return self.a + self.b

  def dif(self) -> int:
    return self.a - self.b

  def seki(self) -> int:
    return self.a * self.b

  def shou(self) -> str | int:
    if self.b == 0:
      return "Not Devide!"
    return self.a / self.b
