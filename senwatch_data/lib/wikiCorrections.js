module.exports = sen_name =>
  sen_name
    .replace("Charles Grassley", "Chuck Grassley") // Iowa
    .replace("John Kennedy", "John Neely Kennedy") //Louisiana
    .replace("Dan Sullivan", "Dan Sullivan (U.S. Senator)") //Alaska
    .replace("Michael Crapo", "Mike Crapo") //Idaho
    .replace("Mike Lee", "Mike Lee (U.S. politician)") //Utah
    .replace("Christopher Coons", "Chris Coons")
    .replace("Thomas Carper", "Tom Carper")
    .replace("Benjamin Cardin", "Ben Cardin")
    .replace("Bob Casey", "Bob Casey Jr.")
    .replace("Jack Reed", "Jack Reed (politician)")
    .replace("Edward Markey", "Ed Markey")
    .replace("Margaret Hassan", "Maggie Hassan")
    .replace("Richard Durbin", "Dick Durbin")
    .replace("Gary Peters", "Gary Peters (politician)")
    .replace("Shelley Capito", "Shelley Moore Capito")
    .replace("James Inhofe", "Jim Inhofe")
    .replace("Charles Schumer", "Chuck Schumer")
    .replace("Bernard Sanders", "Bernie Sanders")
    .replace("Michael Enzi", "Mike Enzi")
    .replace("Robert Menendez", "Bob Menendez")
    .replace("Christopher Murphy", "Chris Murphy (Connecticut politician)")
    .replace("Ron Johnson", "Ron Johnson (American politician)")
    .replace("Patrick Toomey", "Pat Toomey")
    .replace(" III", "")
    .replace(" ", "%20");
