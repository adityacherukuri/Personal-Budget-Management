import React from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export default class ChartJS extends React.Component {
  myBudget = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF7F50",
          "#FFB6C1",
          "#87CEFA",
          "#008080",
          "#808080",
          "#8FBC8F",
          "#D3D3D3",
        ],
      },
    ],
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/budget`).then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.myBudget.length; i++) {
        this.myBudget.datasets[0].data[i] = res.data.myBudget[i].budget;
        this.myBudget.labels[i] = res.data.myBudget[i].title;
      }
      console.log(this.myBudget);
      const pb = res.data.myBudget;
      this.setState({ pb });
    });
  }

  render() {
    return (
      <div>
        <Pie
          data={this.myBudget}
          options={{
            title: {
              display: true,
              text: "Here is the breakdown of your monthly expenditure...",
              fontSize: 20,
              fontColor: "#000000",
            },
          }}
        />
      </div>
    );
  }
}
