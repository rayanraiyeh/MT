import faker from 'faker';

export const optionsMsgs = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Messages',
      },
    },
  };
  
  const labels = ['Day1', 'Day2', 'Day3'];
  
  export const dataMsgs = {
    labels,
    datasets: [
      {
        label: 'Amount sent',
        data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
        borderColor: '#488E48',
        backgroundColor: '#59B259',
      },
      {
        label: 'Amount Received',
        data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Amount Failed',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
  export const optionsCalls = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calls',
      },
    },
  };
  
  
  export const dataCalls = {
    labels,
    datasets: [
      {
        label: 'Calls sent',
        data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
        borderColor: '#488E48',
        backgroundColor: '#59B259',
      },
      {
        label: 'Calls Received',
        data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Calls Failed',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  