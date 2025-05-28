
// With checkwx for API resource // 

async function getTafMetar() {
  console.log("Function is running...");

  const icaoCode = document.getElementById("tafInput").value.trim().toUpperCase();

  if(!icaoCode) {
    alert("Please enter a valid ICAO airport code");
    return;

}
  const apiKey = "0030f72ccd534a6c8b92deb40460473b";  

  try{
  //console.log(`Fetching TAF data for: ${icaoCode}...`);  

  const tafResponse = await fetch(`https://api.checkwx.com/taf/${icaoCode}/decoded`, {
    headers: { "X-API-Key": apiKey },
  }); 

  const metarResponse = await fetch(`https://api.checkwx.com/metar/${icaoCode}/decoded`, {
      headers: { "X-API-Key": apiKey },
    });

  //console.log("TAF API Response:", tafResponse); // Log the response

    if (!tafResponse.ok || !metarResponse.ok) {
      throw new Error(`HTTP error! Status: ${tafResponse.status}`);
    }

    const tafData = await tafResponse.json(); // Convert response to JSON
    const metarData = await metarResponse.json();


    console.log("TAF Data:", tafData); // Log the actual data
    console.log("METAR Data:", metarData);

    document.getElementById("taf").innerHTML =
      tafData.data.length > 0
        ? `<strong>TAF:</strong> ${tafData.data[0].raw_text}

        <p><strong>TAF Issued:</strong> ${tafData.data[0].timestamp.from}
        <p><strong>Valid Period:</strong> ${tafData.data[0].timestamp.to}
        <p><strong>Wind:</strong> ${tafData.data[0].forecast[0].wind.degrees}° at ${tafData.data[0].forecast[0].wind.speed_kts} knots
        <p><strong>Visibility:</strong> ${tafData.data[0].forecast[0].visibility.miles} miles
        <p><strong>Cloud Cover:</strong> ${tafData.data[0].forecast[0].clouds[0].text} at ${tafData.data[0].forecast[0].clouds[0].base_feet_agl} feet AGL.`

        : `Data is not available`

       // Do not modify below //
    document.getElementById("metar").innerHTML =
      metarData.data.length > 0
        ? `<strong>METAR:</strong> ${metarData.data[0].raw_text}
      <p><strong>Temperature:</strong> ${metarData.data[0].temperature.celsius}°C (${metarData.data[0].temperature.fahrenheit}°F)
      <p><strong>Wind:</strong> ${metarData.data[0].wind.degrees}° at ${metarData.data[0].wind.speed_kts} knots   
      <p><strong>Visibility:</strong> ${metarData.data[0].visibility.miles} miles
      <p><strong>Cloud Cover:</strong> ${metarData.data[0].clouds[0].text} at ${metarData.data[0].clouds[0].base_feet_agl} feet AGL`
       : `<strong>METAR:</strong> Data not available.`;

    // Call getTfrs function with the ICAO code
    await getTfrs(icaoCode);      

















 } catch (error) {

  console.error("Error fetching data:", error);
    document.getElementById("taf").innerHTML = `<strong>TAF:</strong> Error fetching data.`;
    document.getElementById("metar").innerHTML = `<strong>TAF:</strong> Error fetching data.`;



}


} 


//fetching the NOTAM data
async function getTfrs(icaoCode) {
  console.log(`Fetching TFR data for: ${icaoCode}...`);

  try {
    const response = await fetch(`https://aerodatabox.p.rapidapi.com/airports/icao/${icaoCode}/notams`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "78737589a5msh685bc49a678714ap1ed320jsnf31724b9a73d",
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com"
      }
    });
    
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      document.getElementById("tfr").innerHTML = `TFR data unavailable (Error ${response.status})`;
      return;
    }
    
    const data = await response.json();
    console.log("Parsed data:", data);
    
    if (!data.notams || !Array.isArray(data.notams)) {
      document.getElementById("tfr").innerHTML = "No NOTAM data available for this airport.";
      return;
    }
    
    // Filter for TFRs in the NOTAMs, if available
    const tfrs = data.notams.filter(notam => 
      notam.all && notam.all.toUpperCase().includes("TFR")
    );
    // Display or process TFRs
    console.log("TFRs found:", tfrs);
    document.getElementById("tfr").innerHTML = tfrs.length > 0
      ? `There ${tfrs.length === 1 ? "is" : "are"} ${tfrs.length} TFR${tfrs.length === 1 ? "" : "s"} active near ${icaoCode}:<br>` +
        tfrs.map(tfr => `<p>${tfr.all}</p>`).join("")
      : `No TFRs active near ${icaoCode} today.`;
  } catch (error) {
    console.error("TFR fetch error:", error);
    document.getElementById("tfr").innerHTML = "TFR data temporarily unavailable.";
  }
}





















console.log("JavaScript loaded and waiting for input...");  























//This version below only works for JFK Ariport//
/*var myHeaders = new Headers();
myHeaders.append("X-API-Key", "0030f72ccd534a6c8b92deb40460473b");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.checkwx.com/metar/KJFK/decoded", requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log("Decoded METAR Data:", data);
    const metarData = data;
    // You can now use the `metarData` variable as needed

//Extracting the API information and displaying in HTML

const metar = data.data[0]
const metarHTML = `
  METAR Data: <h2>${metar.station.name} (${metar.icao})</h2>
  <p><strong>Raw METAR:</strong> ${metar.raw_text}</p>
  `;

  document.getElementById("metarOutput").innerHTML = metarHTML;
  })
  .catch(error => console.error("Error fetching METAR data:", error));*/





















