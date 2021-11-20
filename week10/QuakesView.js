 // Quake View handler
 export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
      //build a list of the quakes...include the title and time of each quake then append the list to listElement.
      listElement.innerHTML = quakeList.features
      .map(quake => {
        return `<li data-id=${quake.id}>
  ${quake.properties.title}, ${new Date(
          quake.properties.time
        )}</li>
  `;
      })
      .join('');
    }
    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      element.innerHTML = quakeProperties
      .map(property => {
          if (property[0] === 'time' || property[0] === 'updated') {
              return `<li>${property[0]}: ${new Date(property[1])}</li>`;
          } else return `<li>${property[0]}: ${property[1]}</li>`;
      })
      .join('');
    }
  }