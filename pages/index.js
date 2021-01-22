import React, { useEffect, useState } from 'react';
import Head from 'next/head'

import UkMap from '../UkMap';

const cumulativeApi = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","cumPeopleVaccinatedFirstDoseByPublishDate":"cumPeopleVaccinatedFirstDoseByPublishDate"}`;
const ukPopulationCount = 66796800; // https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/timeseries/ukpop/pop

const Index = () => {
  const [currentCumulativeFirstDose, setCurrentCumulativeFirstDose] = useState(null);

  useEffect(() => {
    (async() => {
      const data = await fetch(cumulativeApi);
      const parsedData = await data.json();
      setCurrentCumulativeFirstDose(parsedData.data[0].cumPeopleVaccinatedFirstDoseByPublishDate);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>UK Covid19 Vaccinations</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/normalize.css" rel="stylesheet" />
        <link href="/styles.css" rel="stylesheet" />
      </Head>
      <div className="container">
        {typeof currentCumulativeFirstDose === 'number' && (
          <>
            <div className="title">{currentCumulativeFirstDose.toLocaleString()}</div>
            <div className="subtitle">1st Dose</div>
          </>
        )}

        <div className="map-container">
          <div className="percentage">{currentCumulativeFirstDose && `${(currentCumulativeFirstDose / ukPopulationCount * 100).toFixed(2)}%`}</div>
          <UkMap percentage={currentCumulativeFirstDose / ukPopulationCount} />
        </div>

        <a className="source" href="https://coronavirus.data.gov.uk/details/vaccinations">Coronavirus: Public Health England</a>
        {` | `}
        <a className="source" href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/timeseries/ukpop/pop">UK Population: Office for National Statistics</a>
      </div>
    </>
  )
};

export default Index;