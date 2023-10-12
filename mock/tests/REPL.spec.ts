import { test, expect } from "@playwright/test";
import {
  TEXT_input_box,
  TEXT_try_button_accessible_name,
  TEXT_try_button_text,
} from "../src/components/constants";
import "../src/components/data/mockedJson";

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

test("if I search 'white' without column ID, I get the correct result", async ({
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
  await page.getByLabel(TEXT_input_box).fill("search white");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "ri" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "white" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '" $1,058.47 "' })).toBeVisible();
  await expect(page.getByRole("cell", { name: "395773.6521" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$1.00" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "75%" })).toBeVisible();
});

test("if I search 'white' with column index 1, I get the correct result", async ({
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
  await page.getByLabel(TEXT_input_box).fill("search 1 white");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "ri" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "white" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '" $1,058.47 "' })).toBeVisible();
  await expect(page.getByRole("cell", { name: "395773.6521" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$1.00" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "75%" })).toBeVisible();
});

test("if I search 'white' with column header 'data type', I get the correct result", async ({
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
  await page.getByLabel(TEXT_input_box).fill('search "data type" white');
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "ri" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "white" })).toBeVisible();
  await expect(page.getByRole("cell", { name: '" $1,058.47 "' })).toBeVisible();
  await expect(page.getByRole("cell", { name: "395773.6521" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "$1.00" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "75%" })).toBeVisible();
});

test("if I load a file with a header and then view, I get the correct table", async ({
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
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();


  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("row", { name: "State Data Type Average Weekly Earnings Number of Workers Earnings Disparity Employed Percent"})).toBeVisible();
  await expect(page.getByRole("row", { name: 'RI White " $1,058.47 " 395773.6521  $1.00  75%'})).toBeVisible();
  await expect(page.getByRole("row", { name: "RI Black $770.26 30424.80376 $0.73 6%"})).toBeVisible();
  await expect(page.getByRole("row", { name: "RI Native American/American Indian $471.07 2315.505646 $0.45 0%"})).toBeVisible();
  await expect(page.getByRole("row", { name: 'RI Asian-Pacific Islander " $1,080.09 " 18956.71657 $1.02 4%'})).toBeVisible();
  await expect(page.getByRole("row", { name: "RI Hispanic/Latino $673.14 74596.18851 $0.64 14%"})).toBeVisible();
  await expect(page.getByRole("row", { name: "RI Multiracial $971.89 8883.049171 $0.92 2%"})).toBeVisible();

});

test("if I load a file without a header and then view, I get the correct table", async ({
  page,
}) => {
  await page.getByLabel(TEXT_input_box).click();
  await page
    .getByLabel(TEXT_input_box)
    .fill(
      "load_file /Users/chloenevas/Documents/mock-cnevas-rgonza27/mock/src/components/data/stars.csv"
    );
  await page.getByRole("button").click();
  await page.getByLabel(TEXT_input_box).click();
  await page.getByLabel(TEXT_input_box).fill("view");
  await page.getByRole("button").click();

  await expect(page.getByRole("table")).toBeVisible();

  await expect(page.getByRole("row", { name: "0 Sol 0 0 0" })).toBeVisible;
  await expect(page.getByRole("row", { name: "1 282.43485 0.00449 5.36884" })).toBeVisible;
  await expect(page.getByRole("row", { name: "2 43.04329 0.00285 -15.24144" })).toBeVisible;
  await expect(page.getByRole("row", { name: "3 277.11358 0.02422 223.27753" })).toBeVisible;
  await expect(page.getByRole("row", { name: "3759 96 G. Psc 7.26388 1.55643 0.68697" })).toBeVisible;
  await expect(page.getByRole("row", { name: "70667 Proxima Centauri -0.47175 -0.36132 -1.15037" })).toBeVisible;
  await expect(page.getByRole("row", { name: "71454 Rigel Kentaurus B -0.50359 -0.42128 -1.1767" })).toBeVisible;
  await expect(page.getByRole("row", { name: "71457 Rigel Kentaurus A -0.50362 -0.42139 -1.17665" })).toBeVisible;
  await expect(page.getByRole("row", { name: "87666 Barnard's Star -0.01729 -1.81533 0.14824" })).toBeVisible;
  await expect(page.getByRole("row", { name: "118721 -2.28262 0.64697 0.20354" })).toBeVisible;

});
