import * as path from "path"
import { getSlugs } from "./slugger"

jest.mock("fs")

describe("getSlugs", () => {
  const now = new Date()
  const baseDir = path.resolve("_posts")
  const filePath = path.resolve(baseDir, "intro.md")

  beforeAll(() => {
    const post = `---
title: 'Lorem Ipsum Dolor Sit Amet'
date: '${now}'
author: 'Somebody'
---

    # Lorem ipsum dolor sit amet

    Hello and welcome!

    ## References

    * [jest](https://www.npmjs.com/jest)
    * [react](https://www.npmjs.com/react)
    * [graphql](https://www.npmjs.com/graphql)
    `
    // @ts-ignore
    require("fs").__setMockFile(filePath, post)
  })

  it("should pick fields from slugs", () => {
    expect(getSlugs(baseDir, ["title", "date", "author"])).toEqual([{
      title: "Lorem Ipsum Dolor Sit Amet",
      author: "Somebody",
      date: `${now}`
    }])
  })
})
