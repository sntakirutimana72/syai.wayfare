let trips = [
  // dummy data entries
  {
    id: 1,
    origin: 'DownTown',
    destination: 'Nyanza',
    fare: 277, 
    status: 'active',
    seating_capacity: 30,
    trip_date: '14-Aug-2019',
    created_on: '13-Aug-2019',
    bus_licence_number: 'RAD776K',
    seats: (function(){
      let s = [];
      for (let i=1; i<=30; i++) s.push(i);
      return s;
    })()
  }, {
    id: 2,
    origin: 'DownTown',
    destination: 'Kimironko',
    fare: 253, 
    status: 'active',
    seating_capacity: 2,
    trip_date: '13-Aug-2019',
    created_on: '13-Aug-2019',
    bus_licence_number: 'RAD772M',
    seats: (function(){
      let s = [];
      for (let i=1; i<=2; i++) s.push(i);
      return s;
    })()
  }, {
    id: 3,
    origin: 'Nyabugogo',
    destination: 'Remera',
    fare: 300.7, 
    status: 'active',
    seating_capacity: 35,
    trip_date: '14-Aug-2019',
    created_on: '13-Aug-2019',
    bus_licence_number: 'RAD770P',
    seats: (function(){
      let s = [];
      for (let i=1; i<=35; i++) s.push(i);
      return s;
    })()
  }, {
    id: 4,
    origin: 'Kimironko',
    destination: 'Nyanza',
    fare: 233, 
    status: 'cancelled',
    seating_capacity: 15,
    trip_date: '10-Aug-2019',
    created_on: '13-Aug-2019',
    bus_licence_number: 'RAD779T',
    seats: (function(){
      let s = [];
      for (let i=1; i<=15; i++) s.push(i);
      return s;
    })()
  }
];

export default trips;
