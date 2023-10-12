import { test, expect } from "@playwright/test";
import {
  TEXT_input_box,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "../src/components/constants";
import "../src/components/data/mockedJson";
import { incomeDictionary } from "../src/components/data/mockedJson";

import { History } from "../src/components/REPL/History";
import { HistoryProps } from "../src/components/REPL/History";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("trying to view without loading a file produces an error", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  const output = await page.evaluate(() => {
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(output).toBe("No Files Have Been Parsed");
});

test("after loading a valid file, the response is success", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );

  await page.getByRole("button").click();
  await page.waitForSelector(".historySpace");
  const resultText = await page.evaluate(() => {
    // gets first element that matches .historySpace
    return document.querySelector(".historySpace")?.textContent;
  });

  expect(resultText).toBe("success!");
});


test("if I search without column ID, I get the correct result", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/income.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("search RI");
  await page.getByRole("button").click();

  await page.waitForSelector(".historySpace");
    const result = await page.evaluate(() => {
      return document.querySelector(".historySpace")?.innerHTML;
    });
    
const historyArray = incomeDictionary.get("ri");
const historyProps: HistoryProps = {
  history: []
};

if (historyArray !== undefined) {
  historyProps.history = [historyArray];
} else {
  historyProps.history = ["history is undefined"];
}

    expect(result, History(historyProps));
});
