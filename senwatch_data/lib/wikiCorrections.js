module.exports = sen_name => {
  const corrections = {
    "Charles Grassley": "Chuck Grassley", // Iowa
    "John Kennedy": "John Neely Kennedy", //Louisiana
    "Dan Sullivan": "Dan Sullivan (U.S. Senator)", //Alaska
    "Michael Crapo": "Mike Crapo", //Idaho
    "Mike Lee": "Mike Lee (U.S. politician)", //Utah
    "Christopher Coons": "Chris Coons",
    "Thomas Carper": "Tom Carper",
    "Benjamin Cardin": "Ben Cardin",
    "Bob Casey": "Bob Casey Jr.",
    "Jack Reed": "Jack Reed (politician)",
    "Edward Markey": "Ed Markey",
    "Margaret Hassan": "Maggie Hassan",
    "Richard Durbin": "Dick Durbin",
    "Gary Peters": "Gary Peters (politician)",
    "Shelley Capito": "Shelley Moore Capito",
    "James Inhofe": "Jim Inhofe",
    "Charles Schumer": "Chuck Schumer",
    "Bernard Sanders": "Bernie Sanders",
    "Michael Enzi": "Mike Enzi",
    "Robert Menendez": "Bob Menendez",
    "Christopher Murphy": "Chris Murphy (Connecticut politician)",
    "Ron Johnson": "Ron Johnson (American politician)",
    "Patrick Toomey": "Pat Toomey"
  };
  if (corrections[sen_name]) sen_name = corrections[sen_name];

  return sen_name.replace(" III", "").replace(" ", "%20");
};
