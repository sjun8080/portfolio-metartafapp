In aviation, METAR and TAF are standardized formats used worldwide for reporting weather conditions, primarily for flight planning and operations:
The METAR/TAF project is a web-based tool that allows users to retrieve and display real-time aviation weather reports (METAR) and forecasts (TAF) for any airport using its ICAO code. It leverages the CheckWX API as the data source.

​

User Input: Users enter an ICAO airport code (e.g., KJFK for JFK Airport) into a form.

API Integration: The app fetches both TAF (Terminal Aerodrome Forecast) and METAR (Meteorological Aerodrome Report) data from the CheckWX API using the provided ICAO code.

Data Display:

TAF: Shows the raw TAF text, issue time, validity period, wind, visibility, and cloud cover from the forecast.

METAR: Shows the raw METAR text, temperature, wind, visibility, and cloud cover.

Error Handling:
If the ICAO code is invalid or the API call fails, the app displays an error message.

​

The primary objective of this project is to develop proficiency in interfacing with external APIs, retrieving structured data from open-source sources, and programmatically parsing and presenting the results in a user-friendly application.
