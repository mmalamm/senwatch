//main call
fs.open('error_log.txt', 'a', (e, id) => {
  fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
    fs.close( id, () => {
      console.log(chalk.bgRed.bold('error logged'));
    });
  });
});

//pp2 call
fs.open('error_log.txt', 'a', (e, id) => {
  fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
    fs.close( id, () => {
      console.log(`pp2req for ${sen.first_name} ${sen.last_name} didnt work! error logged.`);
    });
  });
});

//pp3 call
fs.open('error_log.txt', 'a', (e, id) => {
  fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
    fs.close( id, () => {
      console.log(`pp2req for ${sen.first_name} ${sen.last_name} didnt work! error logged.`);
    });
  });
});

//dTweets call
fs.open('error_log.txt', 'a', (e, id) => {
  fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
    fs.close( id, () => {
      console.log(`${sen.first_name} ${sen.last_name} dTweetsReq didnt work`);
    });
  });
});

//crp call
fs.open('error_log.txt', 'a', (e, id) => {
  fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
    fs.close( id, () => {
      console.log(`crpReq for ${sen.first_name} ${sen.last_name} didnt work! error logged.`);
    });
  });
});

//wiki call
fs.open('error_log.txt', 'a', (e, id) => {
  fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
    fs.close( id, () => {
      console.log(`wikiReq for ${sen.first_name} ${sen.last_name} didnt work! error logged.`);
    });
  });
});
