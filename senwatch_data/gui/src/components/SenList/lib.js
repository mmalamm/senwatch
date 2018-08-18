import axios from "axios";

export const getPartyClass = party =>
  party === "D" ? "Democratic" : party === "R" ? "Republican" : "Other";

export const getImage = sen => {
  const sen_name = formatName(`${sen.first_name} ${sen.last_name}`);
  const defaultImg = `https://www.congress.gov/img/member/${sen.id.toLowerCase()}.jpg`;
  console.log(sen_name);
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${sen_name}&format=json&prop=pageimages&origin=*`
      )
      .then(({ data }) => {
        console.log(data);
        const result = data.query.pages;
        let thumbnail = result[Object.keys(result)[0]].thumbnail;
        let pic_url = thumbnail ? thumbnail.source : defaultImg;
        pic_url = pic_url.replace(/\d+px/, "500px");
        resolve(pic_url);
      })
      .catch(e => reject(e));
  });
};

const formatName = sen_name => {
  //correct names for wikipedia api
  let newname = sen_name
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
  return newname;
};
