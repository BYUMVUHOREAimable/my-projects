void main() {
  //variables
  int age = 20;
  double pi = 3.14;
  String name = "BYUMVUHORE";
  bool isSingle = true;
  print(age);
  print(pi);
  print(name);
  print(isSingle);

  int firstValue = 25;
  firstValue -= 75;
  //firstValue = firstValue - 75;
  print(firstValue);

  String firstName = "BYUMVUHORE";
  String lastName = "Aimable";
  String fullName = firstName + " " + lastName;
  print(fullName);

  //Multiline String
  String aboutMe = """
  My name is $name.
  I am $age years old.
  I am a student.
  """;
  print(aboutMe);
}
