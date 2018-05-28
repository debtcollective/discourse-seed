// Really long strings/template literals that are part of the seed, but were cluttering up `seed.js`
// Separating them out will make internationalization easier later.
const strings = {
  subCategories: {
    events: {
      post: {
        raw:
          'An event is a private gathering organized by any COLLECTIVE member for the purpose of organizing. Events include BBQs and pizza parties or other community gatherings. They can also include debt assemblies, events where people come together to talk about their debt or debt dispute parties where attendees file debt disputes and/or learn more about debt.',
      },
    },
    template: `Include a short title for your event

Include brief description

If it is relevant, don’t forget to provide a location and time

Who is invited?`,
  },
  collectives: {
    forProfitCollective: {
      post: {
        raw: `For anyone who is in debt after attending a for-profit college.
    
### We are former for-profit college students who have joined with others in our situation to fight back against predatory creditors and the federal government.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

                                       Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    studentDebtCollective: {
      post: {
        raw: `For anyone who has student loans.
    
### We are student debtors who have joined with others in our situation to fight back against predatory creditors and the federal government.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    creditDebtCollective: {
      post: {
        raw: `For anyone who has credit card debt.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    housingDebtCollective: {
      post: {
        raw: `For anyone who went into debt for a place to live.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    paydayLoansCollective: {
      post: {
        raw: `For anybody in debt to a payday lender or check casher.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

        Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    autoLoansCollective: {
      post: {
        raw: `For anyone who went into debt to buy a car.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.
  
We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    courtFinesCollective: {
      post: {
        raw: `For anyone who is in debt to a local court system or probation company.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    medicalDebtCollective: {
      post: {
        raw: `For anyone who went into debt for health care.

### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
      },
    },
    solidarityBloc: {
      post: {
        raw: `For anyone organizing in solidarity with people in debt.

We organize in solidarity with those who are struggling under the weight of indebtedness for simply trying to access basic needs like healthcare, education and housing.

We are committed to direct action, mutual aid and campaign support.`,
      },
    },
  },
};

module.exports = { strings };
