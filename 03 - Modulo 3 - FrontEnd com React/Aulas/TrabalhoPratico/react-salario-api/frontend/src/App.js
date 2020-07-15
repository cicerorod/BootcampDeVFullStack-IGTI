import React, { Component } from "react";

import InputFullSalary from "./components/InputFullSalary";
import InputReadOnly from "./components/InputReadOnly";
//import * as salaryHelpers from "./helpers/salary";
import ProgressBarSalary from "./components/ProgressBarSalary";
import api from "./services/ApiSalario";

const COLOR_INSS = "#e67e22";
const COLOR_IRPF = "#c0392b";
const COLOR_NET_SALARY = "#990876";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
      baseINSS: 0,
      baseIRPF: 0,
      discountINSS: 0,
      discountIRPF: 0,
      netSalary: 0,
      parcentBaseIRPF: 0,
      parcentBaseInss: 0,
      parcentDiscountIRPF: 0,
      parcentDiscountInss: 0,
      parcentNetSalary: 0,
    };

    this.calculaSalary(this.state.fullSalary);
  }

  handleSalaryChange = (newSalary) => {
    //this.setState({ fullSalary: newSalary });
    // const data = api.get(`/baseSalario/salario/${this.state.fullSalary}`);
    // this.setState(() => ({
    //   baseINSS: 0, //dataFinal.baseINSS,
    //   baseIRPF: dataFinal.baseIRPF,
    //   discountINSS: dataFinal.discountINSS,
    //   discountIRPF: dataFinal.discountIRPF,
    //   netSalary: dataFinal.netSalary,
    //   parcentBaseIRPF: dataFinal.parcentBaseIRPF,
    //   parcentBaseInss: dataFinal.parcentBaseInss,
    //   parcentDiscountIRPF: dataFinal.parcentDiscountIRPF,
    //   parcentDiscountInss: dataFinal.parcentDiscountInss,
    //   parcentNetSalary: dataFinal.parcentNetSalary,
    // }));
  };

  async calculaSalary() {
    const data = await api.get(`baseSalario/salario/${this.state.fullSalary}`);
    const dataFinal = data.data;

    // console.log("Data: " + JSON.stringify(data));
    // console.log("Data.data: " + JSON.stringify(data.data));
    // console.log("DataFinal: " + JSON.stringify(dataFinal));

    this.setState(() => ({
      fullSalary: dataFinal.fullSalary,
      baseINSS: dataFinal.baseINSS,
      baseIRPF: dataFinal.baseIRPF,
      discountINSS: dataFinal.discountINSS,
      discountIRPF: dataFinal.discountIRPF,
      netSalary: dataFinal.netSalary,
      parcentBaseIRPF: dataFinal.parcentBaseIRPF,
      parcentBaseInss: dataFinal.parcentBaseInss,
      parcentDiscountIRPF: dataFinal.parcentDiscountIRPF,
      parcentDiscountInss: dataFinal.parcentDiscountInss,
      parcentNetSalary: dataFinal.parcentNetSalary,
    }));
  }

  render() {
    // const { fullSalary } = this.state;

    const {
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
      parcentBaseIRPF,
      parcentBaseInss,
      parcentDiscountIRPF,
      parcentDiscountInss,
      parcentNetSalary,
    } = this.state;

    return (
      <div className="container">
        <h1 className="center">React Salário</h1>

        <div className="row">
          {/* <InputFullSalary
            currentValue={fullSalary}
            //onSalaryChange={this.handleSalaryChange}
            //onSalaryChange={this.calculaSalary}

            //onChange={this.handleFilter}
            onChange={(e) =>
              this.setState({ fullSalary: 2000 }, () => {
                {
                  this.calculaSalary();
                }
              })
            }
          /> */}

          <div className="input-field col s12">
            <input
              autoFocus
              id="inputFullSalary"
              type="number"
              vvalue={this.state.fullSalary}
              onChange={(e) =>
                this.setState({ fullSalary: e.target.value }, () => {
                  this.calculaSalary();
                })
              }
              min="1000"
              step="100"
            />
            <label className="active" htmlFor="inputFullSalary">
              Salário bruto
            </label>
          </div>

          <InputReadOnly label="Base INSS:" value={baseINSS} />

          <InputReadOnly
            label="Desconto INSS:"
            value={discountINSS}
            percentage={parcentDiscountInss}
            color={COLOR_INSS}
          />

          <InputReadOnly label="Base IRPF:" value={baseIRPF} />

          <InputReadOnly
            label="Desconto IRPF:"
            value={discountIRPF}
            percentage={parcentDiscountIRPF}
            color={COLOR_IRPF}
          />

          <InputReadOnly
            label="Salário líquido:"
            value={netSalary}
            percentage={parcentNetSalary}
            color={COLOR_NET_SALARY}
          />
        </div>

        <ProgressBarSalary
          percentINSS={parcentBaseInss}
          colorINSS={COLOR_INSS}
          percentIRPF={parcentBaseIRPF}
          colorIRPF={COLOR_IRPF}
          percentNetSalary={parcentNetSalary}
          colorNetSalary={COLOR_NET_SALARY}
        />
      </div>
    );
  }
}
