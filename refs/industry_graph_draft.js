//step 1) get an array of all the senators with oil and gas as donors
let oilmen = senators.filter( sen => {
  if (!sen.crp.candIndustry) return false;
  return sen.crp.candIndustry.industry.filter( ind =>
    ind['@attributes'].industry_name === 'Oil & Gas' ).length;
});

//step 2) sort the array by sen.crp.candIndustry.industry.filter( ind => ind['@attributes'].industry_name === 'Oil & Gas' )[0]['@attributes'].total
let filterer = (sen) => {
  return Number(
    sen.crp.candIndustry.industry.filter( ind =>
      ind['@attributes'].industry_name === 'Oil & Gas'
    )[0]['@attributes'].total
  );
};

oilmen.sort( (b, a) =>
  filterer(a) - filterer(b)
);
