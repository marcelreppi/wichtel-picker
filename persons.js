function Person(name, email, exclude = []) {
  this.name = name;
  this.email = email;
  this.exclude = exclude;
}

module.exports = [
  new Person("Alice", "alice@gmail.com"),
  new Person("Bob", "bob@web.de"),
  new Person("Charlie", "charlie@live.de", ["david@live.de"]),
  new Person("David", "david@live.de", ["charlie@live.de"]),
  new Person("Eric", "eric@gmx.de"),
]
