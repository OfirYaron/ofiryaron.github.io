[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "The Osek Murshe Survival Guide: Never Guess Your Tax Savings Again"
[_metadata_:tags]:- "apple-shortcuts,israel,freelance,taxes,osek-murshe,productivity"
[_metadata_:date]:- "06/04/2026"

As an **Osek Murshe (עוסק מורשה)** in Israel, getting paid is a double-edged sword. You see a large sum enter your bank account, but you know deep down that a significant chunk of it doesn't belong to you. It belongs to the Tax Authority (Mas Hachnasa) and the VAT office (Ma'am).

The most common mistake? Treating the **Total Invoice** as your actual income. By the time the 15th or 23rd of the month rolls around, you've spent the money you were supposed to "put aside."

If you have an **iPhone, Mac, or iPad**, you can solve this forever with a single tap. Here is how to build your own **Israeli Tax Splitter** using Apple Shortcuts.
<br />

### Why Automate Your Taxes?

1. **Mental Clarity:** Instantly know your "Real" profit after VAT and Income Tax.
2. **No More Math:** Stop dividing by 1.18 on your calculator every time you get a check.
3. **Deadline Awareness:** The shortcut tells you exactly how many days you have until the next payment window (23rd for Tax and Ma'am in my case, but you can change to your liking).
4. **One-Tap Access:** You can run this from your Home Screen or even by asking Siri.
<br />

### The Build: Step-by-Step

#### 1. The Math (Back-Calculating the VAT)

Since an Osek Murshe invoice includes 18% VAT, we have to "strip" that VAT first to find your actual income before calculating your 30% income tax.

- **Action:** `Ask for Input` (Set type to **Number**).
- **Action:** `Calculate` → `Provided Input` ÷ **1.18**.
- **Action:** `Set Variable` → Name it **BaseIncome**.
- **Action:** `Calculate` → `Provided Input` − **BaseIncome**.
- **Action:** `Set Variable` → Name it **VATAmount**.
- **Action:** `Calculate` → `BaseIncome` × **0.30**.
- **Action:** `Set Variable` → Name it **IncomeTax**.
<br />

#### 2. The Deadline Logic

Israeli tax dates are specific: **Income Tax** is usually due the 21st of the next month, and **Ma'am** is due the 23rd of the next **Odd** month. (In some cases Tax is due every Odd month as well — you may change accordingly.)

**For the Income Tax (The 21st):**

1. **Action:** `Adjust Date` → Add **1 month** to **Current Date**.
2. **Action:** `Get Dates from Input` → Tap the variable, choose **Date Format: Custom**, and type `MM/21/yyyy`.
3. **Action:** `Get Time Between Dates` → Calculate days from **Current Date** to this new date.
4. **Action:** `Set Variable` → **DaysUntilTax**.

**For the VAT (The Odd-Month 23rd):**

1. **Action:** `Format Date` → Use Custom format `M` (to get the month number).
2. **Action:** `Calculate` → `Formatted Date` **mod 2**.
3. **Action:** `If` statement:
    - **If** calculation **is 0** (Even month): `Adjust Date` (Add 1 month to current date).
    - **Otherwise** (Odd month): Check if today is after the 23rd; if so, `Adjust Date` (Add 2 months).
4. **Action:** `Get Dates from Input` → Set format to `MM/23/yyyy`.
5. **Action:** `Get Time Between Dates` → Find the remaining days and `Set Variable` to **DaysUntilVAT**.
<br />

#### 3. The Result

Finally, add a **Show Result** action to display your "Clean" numbers:

```
💰 Osek Murshe Breakdown
Net Profit: ₪[BaseIncome]

💸 Put Aside Now:
VAT (18%): ₪[VATAmount]
Income Tax (30%): ₪[IncomeTax]

📅 Deadlines:
Income Tax: Due in [DaysUntilTax] days.
VAT (Ma'am): Due in [DaysUntilVAT] days.
```

The next time a client pays you, don't just smile at the bank notification — run the shortcut, move the "Put Aside" amount to a separate savings sub-account, and sleep better at night knowing you are 100% tax-ready.
<br />

### Pro-Tip for the Israeli Worker

Add this shortcut as a **Widget** on your iPhone Home Screen. The next time a client pays you, don't just smile at the bank notification — run the shortcut, move the "Put Aside" amount to a separate savings sub-account, and sleep better at night knowing you are 100% tax-ready.

Grab my shortcut here if you want a head start! But if you have the time, I'd suggest building it from scratch. It's a great way to learn how everything fits together, and it'll make you much more proficient at creating your own tools later on.

[Download the Shortcut →](https://www.icloud.com/shortcuts/75b901335ac147a9a45b129f186b1adc)
