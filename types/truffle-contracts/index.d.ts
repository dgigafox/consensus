/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { MigrationsContract } from "./Migrations";
import { VotingMachineContract } from "./VotingMachine";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "Migrations"): MigrationsContract;
      require(name: "VotingMachine"): VotingMachineContract;
    }
  }
}

export { MigrationsContract, MigrationsInstance } from "./Migrations";
export { VotingMachineContract, VotingMachineInstance } from "./VotingMachine";