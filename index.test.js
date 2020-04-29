describe.skip("running Jest", () => {
  // $ yarn jest
  // $ yarn jest ind
  // $ yarn jest --watch
  // $ yarn jest --watchAll
  // VS Code

  test("should pass", () => {
    expect(true).toBe(true);
  });

  test("should fail", () => {
    expect(true).toBe(false);
  });

  test.todo("should be in quantum state");
});

describe("snapshots", () => {
  const full = {
    number: 1975,
    bool: true,
    string: "Hello, full",
    promise: Promise.resolve("Better job"),
    symbol: Symbol("brewery"),
    [Symbol.for("brewmaster")]: "Next beer!",
    map: new Map([
      ["position1", "workman"],
      ["position2", "stockkeeper"],
    ]),
    set: new Set(["think", "write", "snitch"]),
    func: (compromise) => compromise * 2,
    null: null,
    undefined: undefined,
    date: new Date(),
  };

  test.skip("manual", () => {
    expect(full.number).toBe(1975);
    expect(full.bool).toBeTruthy;
    expect(full.string).toBe("Hello, full");
    expect(full.promise).toBeInstanceOf(Promise);
    expect(typeof full.symbol).toBe("symbol");
    expect(full[Symbol.for("brewmaster")]).toBe("Next beer!");
    expect(full.map).toBeInstanceOf(Map);
    expect(full.map.get("position1")).toBe("workman");
    expect(full.map.get("position2")).toBe("stockkeeper");
    expect(full.set).toBeInstanceOf(Set);
    expect(full.set.has("think")).toBeTruthy();
    expect(full.set.has("write")).toBeTruthy();
    expect(full.set.has("snitch")).toBeTruthy();
    expect(full.func).toBeInstanceOf(Function);
    expect(full.null).toBe(null);
    expect(full.undefined).toBe(undefined);
  });

  test.skip("object equal", () => {
    expect(full).toEqual({
      number: 1975,
      bool: true,
      string: "Hello, full",
      promise: Promise.resolve("Worse job"), // ! different text
      symbol: expect.anything(),
      [Symbol.for("brewmaster")]: "Next beer!",
      map: new Map([
        ["position2", "stockkeeper"],
        ["position1", "workman"], // different order
      ]),
      set: new Set(["write", "think", "snitch"]), // different order
      func: expect.any(Function),
      null: null,
      undefined: undefined,
    });
  });

  test.skip("snapshot", () => {
    // basic, named, inline
  });

  // What if we change a property?
  // What if we add a property?
  // What if a property is Date?
});

describe("snapshot seriasers", () => {
  const play = {
    isPlay: true,
    title: "Audience",
    content: { scenes: 1 },
  };

  const plugin = {
    test: (val) => val && val.isPlay,
    serialize: (val, config, indent, depth, refs, printer) => {
      const name = val.constructor.name;
      const newIndent = indent + config.indent;
      return (
        `Play <${val.title}>: ` +
        printer(val.content, config, newIndent, depth + 1, refs)
      );
    },
  };

  test.skip("own serialiser", () => {
    expect([play]).toMatchInlineSnapshot();
  });
});

describe("diff snapshots", () => {
  const play1 = {
    title: "Audience",
    characters: 2,
  };

  const play2 = { ...play1, characters: 3 };

  test.skip("two snapshots", () => {
    expect(play2).toMatchInlineSnapshot();
    expect(play3).toMatchInlineSnapshot();
  });

  const { snapshotDiff } = require("snapshot-diff");
  // removes extra quotes
  expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer());

  test.skip("diff", () => {
    expect(snapshotDiff(play1, play2)).toMatchInlineSnapshot();
  });

  const { toMatchDiffSnapshot } = require("snapshot-diff");
  expect.extend({ toMatchDiffSnapshot });

  test.skip("diff matcher", () => {
    expect(play1).toMatchDiffSnapshot(play2);
  });
});

describe("function calls", () => {
  test.skip("mock function", () => {
    const fn = jest.fn();

    fn("Vanek");
    fn("Ferdinand", "Vanek");

    expect(fn).toHaveBeenCalledWith("Vanek");
    expect(fn).toHaveBeenCalledWith("Ferdinand", "Vanek");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // What if we change the order?
  // - NthCalledWith
  // - fn.mock.calls
  // What function failed?
});

describe.skip("table testing", () => {
  test("should return 2 when adding 1 and 1", () => {
    expect(1 + 1).toBe(2);
  });
  test("should return 3 when adding 1 and 2", () => {
    expect(1 + 2).toBe(3);
  });
  test("should return 3 when adding 2 and 1", () => {
    expect(2 + 1).toBe(3);
  });

  // test.each
});

describe("promises", () => {
  test("fulfillment", () => {
    Promise.resolve(100).then((n) => {
      expect(n).toBe(7); // !
    });

    return Promise.resolve(7).then((n) => {
      expect(n).toBe(7);
    });

    // What if it rejects?
  });

  test.skip("rejection", () => {
    return Promise.reject(0).catch((n) => {
      expect(n).toBe(0);
    });

    // What if it fulfills?
    // - then
    // - assertions
  });
});

describe("async", () => {
  test.skip("fulfillment", async () => {
    const n = await Promise.resolve(7);
    const m = await Promise.resolve(42);

    expect(n).toBe(7);
    expect(m).toBe(42);

    // What if it rejects?
    // What if we forget an `await`?
  });

  test.skip("rejection", async () => {
    try {
      await Promise.resolve(0);
    } catch (e) {
      expect(e).toBe(0);
    }

    // What if it fulfills?
    // true == false
  });

  test.skip("resolves", async () => {
    await expect(Promise.resolve(7)).resolves.toBe(7);
  });

  test.skip("rejects", async () => {
    await expect(Promise.reject(0)).rejects.not.toBe(7);

    // What if it fulfills?
  });
});
