const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// PAYE tax brackets (in KES) based on KRA tax rates
const taxRates = [
  { upperLimit: 24000, rate: 0.1 }, // 10% for the first 24,000
  { upperLimit: 32333, rate: 0.25 }, // 25% for the next 8,333
  { upperLimit: Infinity, rate: 0.3 }, // 30% for the remaining
];

// NHIF deduction rates based on gross salary
const nhifRates = [
  { upperLimit: 5999, deduction: 150 },
  { upperLimit: 7999, deduction: 300 },
  { upperLimit: 11999, deduction: 400 },
  { upperLimit: 14999, deduction: 500 },
  { upperLimit: 19999, deduction: 600 },
  { upperLimit: 24999, deduction: 750 },
  { upperLimit: 29999, deduction: 850 },
  { upperLimit: 34999, deduction: 900 },
  { upperLimit: 39999, deduction: 950 },
  { upperLimit: 44999, deduction: 1000 },
  { upperLimit: 49999, deduction: 1100 },
  { upperLimit: 59999, deduction: 1200 },
  { upperLimit: 69999, deduction: 1300 },
  { upperLimit: 79999, deduction: 1400 },
  { upperLimit: 89999, deduction: 1500 },
  { upperLimit: 99999, deduction: 1600 },
  { upperLimit: Infinity, deduction: 1700 },
];

// NSSF deduction rate (tier 1, tier 2 contributions)
const nssfRate = 0.06; // 6%

function calculatePAYE(grossSalary) {
  let payee = 0;
  let remainingSalary = grossSalary;

  for (const bracket of taxRates) {
    if (remainingSalary > 0) {
      const taxableAmount = Math.min(remainingSalary, bracket.upperLimit);
      payee += taxableAmount * bracket.rate;
      remainingSalary -= taxableAmount;
    }
  }

  return payee;
}

function calculateNHIF(grossSalary) {
  for (const bracket of nhifRates) {
    if (grossSalary <= bracket.upperLimit) {
      return bracket.deduction;
    }
  }
}

function calculateNSSF(grossSalary) {
  return Math.min(grossSalary * nssfRate, 720); // NSSF cap for tier 1 is 720
}

function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;

  const payee = calculatePAYE(grossSalary);
  const nhif = calculateNHIF(grossSalary);
  const nssf = calculateNSSF(grossSalary);

  const netSalary = grossSalary - (payee + nhif + nssf);

  return { grossSalary, payee, nhif, nssf, netSalary };
}

// Main Program
function promptUser() {
  rl.question("Enter your basic salary (KES): ", (basicInput) => {
    const basicSalary = Number(basicInput);

    rl.question("Enter your benefits (KES): ", (benefitsInput) => {
      const benefits = Number(benefitsInput);

      if (isNaN(basicSalary) || isNaN(benefits)) {
        console.log("Invalid input! Please enter numeric values.");
        rl.close();
        return;
      }

      const { grossSalary, payee, nhif, nssf, netSalary } = calculateNetSalary(
        basicSalary,
        benefits
      );

      console.log("\n--- Salary Breakdown ---");
      console.log(`Basic Salary: KES ${basicSalary}`);
      console.log(`Benefits: KES ${benefits}`);
      console.log(`Gross Salary: KES ${grossSalary}`);
      console.log(`PAYE (Tax): KES ${payee.toFixed(2)}`);
      console.log(`NHIF Deduction: KES ${nhif}`);
      console.log(`NSSF Deduction: KES ${nssf}`);
      console.log(`Net Salary: KES ${netSalary.toFixed(2)}`);

      rl.close();
    });
  });
}

promptUser();
