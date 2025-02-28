export class Order {
  constructor(sFrom) {
      this.OrderState = {
          WELCOMING: () => {
              let aReturn = [];
              this.stateCur = this.OrderState.ORDERING;
              aReturn.push("Welcome to Red Lotus Chinese Restaurant!");
              aReturn.push("What would you like to order? We have Dim Sum, Fried Rice, Chow Mein, Sweet and Sour Chicken, Peking Duck, Kung Pao Chicken, Mapo Tofu, and Spring Rolls.");
              return aReturn;
          },
          ORDERING: (sInput) => {
              let aReturn = [];
              this.sItem = sInput.toLowerCase();
              let menuItems = ["dim sum", "fried rice", "chow mein", "sweet and sour chicken", "peking duck", "kung pao chicken", "mapo tofu", "spring rolls"];
              if (menuItems.includes(this.sItem)) {
                  this.stateCur = this.OrderState.SIZE_SELECTION;
                  aReturn.push(`What size would you like for your ${this.sItem}? (Small, Medium, Large)`);
              } else {
                  aReturn.push("Sorry, we only serve the listed items. Please choose one from our menu.");
              }
              return aReturn;
          },
          SIZE_SELECTION: (sInput) => {
              let aReturn = [];
              this.sSize = sInput;
              if (this.sItem === "dim sum") {
                  this.stateCur = this.OrderState.FILLING_SELECTION;
                  aReturn.push("What filling would you like? (Shrimp, Veggie, Chicken, Beef)");
              } else if (this.sItem === "fried rice" || this.sItem === "chow mein") {
                  this.stateCur = this.OrderState.PROTEIN_SELECTION;
                  aReturn.push("What protein would you like? (Chicken, Beef, Tofu, Shrimp)");
              } else {
                  this.stateCur = this.OrderState.UPSELL;
                  aReturn.push("Would you like a Bubble Tea with that? (Yes/No)");
              }
              return aReturn;
          },
          FILLING_SELECTION: (sInput) => {
              let aReturn = [];
              this.sFilling = sInput;
              this.stateCur = this.OrderState.UPSELL;
              aReturn.push(`Got it! ${this.sSize} Dim Sum with ${this.sFilling}. Would you like a Bubble Tea with that? (Yes/No)`);
              return aReturn;
          },
          PROTEIN_SELECTION: (sInput) => {
              let aReturn = [];
              this.sProtein = sInput;
              this.stateCur = this.OrderState.UPSELL;
              aReturn.push(`Great! ${this.sSize} ${this.sItem} with ${this.sProtein}. Would you like a Bubble Tea with that? (Yes/No)`);
              return aReturn;
          },
          UPSELL: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().startsWith('y')) {
                  this.stateCur = this.OrderState.BUBBLE_TEA;
                  aReturn.push("What flavor Bubble Tea would you like? (Classic, Taro, Mango, Matcha, Strawberry, Lychee, Honeydew)");
              } else {
                  this.stateCur = this.OrderState.CONFIRM;
                  aReturn.push("Alright! Your order is almost ready.");
              }
              return aReturn;
          },
          BUBBLE_TEA: (sInput) => {
              let aReturn = [];
              this.sDrink = sInput;
              this.stateCur = this.OrderState.CONFIRM;
              aReturn.push(`Got it! Adding a ${this.sDrink} Bubble Tea to your order.`);
              return aReturn;
          },
          CONFIRM: () => {
              let aReturn = [];
              this.isDone = true;
              let orderSummary = `Your order is: ${this.sSize} ${this.sItem}`;
              if (this.sItem === "dim sum") {
                  orderSummary += ` with ${this.sFilling}`;
              } else if (this.sItem === "fried rice" || this.sItem === "chow mein") {
                  orderSummary += ` with ${this.sProtein}`;
              }
              if (this.sDrink) {
                  orderSummary += ` and a ${this.sDrink} Bubble Tea`;
              }
              aReturn.push(orderSummary);
              aReturn.push("Please pick up your order at 8692 Panda Lane in 30 minutes. Enjoy your meal!");
              return aReturn;
          }
      };
      this.stateCur = this.OrderState.WELCOMING;
      this.isDone = false;
      this.sFrom = sFrom;
  }
  handleInput(sInput) {
      return this.stateCur(sInput);
  }
  isDone() {
      return this.isDone;
  }
}