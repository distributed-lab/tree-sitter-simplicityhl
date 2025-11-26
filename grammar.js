/**
 * @file Tree-sitter parse for Rust-like high-level language that compiles down to Simplicity bytecode.
 * @author Kyrylo Baibula <kyrylo.baybula@distributed-lab.com>
 * @author Herashchenko Volodymyr <cholkegn@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "simplicityhl",
  extras: ($) => [/\s/, $.comment],

  rules: {
    program: ($) => repeat($.item),

    comment: ($) =>
      token(
        choice(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"), seq("//", /[^\n]*/)),
      ),

    item: ($) => choice($.type_alias, $.function, $.module),

    function: ($) =>
      seq(
        "fn",
        field("definition", $.function_name),
        $.function_params,
        optional($.function_return),
        $.block_expression,
      ),

    function_name: ($) => /[a-zA-Z][a-zA-Z0-9_]*/,

    function_params: ($) =>
      seq(
        "(",
        optional(seq($.typed_identifier, repeat(seq(",", $.typed_identifier)))),
        ")",
      ),

    typed_identifier: ($) => seq(field("definition", $.identifier), ":", $.ty),

    function_return: ($) => seq("->", $.ty),

    block_expression: ($) =>
      seq("{", repeat(seq($.statement, ";")), optional($.expression), "}"),

    statement: ($) => choice($.assignment, $.expression),

    assignment: ($) => seq("let", $.pattern, ":", $.ty, "=", $.expression),

    pattern: ($) =>
      choice(
        $.ignore_pattern,
        $.tuple_pattern,
        $.array_pattern,
        $.variable_pattern,
      ),
    variable_pattern: ($) => field("definition", $.identifier),
    ignore_pattern: ($) => "_",
    tuple_pattern: ($) =>
      seq(
        "(",
        optional(
          seq(
            seq($.pattern, ","),
            repeat(seq($.pattern, ",")),
            optional($.pattern),
          ),
        ),
        ")",
      ),
    array_pattern: ($) =>
      seq(
        "[",
        optional(seq($.pattern, repeat(seq(",", $.pattern)), optional(","))),
        "]",
      ),

    expression: ($) => choice($.block_expression, $.single_expression),

    single_expression: ($) =>
      choice(
        $.left_expr,
        $.right_expr,
        $.none_expr,
        $.some_expr,
        $.false_expr,
        $.true_expr,
        $.call_expr,
        $.match_expr,
        $.tuple_expr,
        $.array_expr,
        $.list_expr,
        $.bin_literal,
        $.hex_literal,
        $.dec_literal,
        $.witness_expr,
        $.param_expr,
        $.variable_expr,
        seq("(", $.expression, ")"),
      ),

    left_expr: ($) => seq("Left", "(", $.expression, ")"),
    right_expr: ($) => seq("Right", "(", $.expression, ")"),
    none_expr: ($) => "None",
    some_expr: ($) => seq("Some", "(", $.expression, ")"),
    false_expr: ($) => "false",
    true_expr: ($) => "true",

    call_expr: ($) => seq($.call_name, $.call_args),

    call_name: ($) =>
      choice(
        $.jet,
        $.unwrap_left,
        $.unwrap_right,
        "is_none",
        "unwrap",
        "assert!",
        "panic!",
        $.type_cast,
        "dbg!",
        $.fold,
        $.array_fold,
        $.for_while,
        field("reference", $.function_name),
      ),

    call_args: ($) =>
      seq(
        "(",
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        ")",
      ),

    match_expr: ($) =>
      seq("match", $.expression, "{", repeat1($.match_arm), "}"),

    match_arm: ($) =>
      seq(
        $.match_pattern,
        "=>",
        choice(
          seq($.single_expression, ","),
          seq($.block_expression, optional(",")),
        ),
      ),

    match_pattern: ($) =>
      choice(
        $.left_pattern,
        $.right_pattern,
        "None",
        $.some_pattern,
        "false",
        "true",
      ),

    left_pattern: ($) => seq("Left", "(", $.typed_identifier, ")"),
    right_pattern: ($) => seq("Right", "(", $.typed_identifier, ")"),
    some_pattern: ($) => seq("Some", "(", $.typed_identifier, ")"),

    tuple_expr: ($) =>
      seq(
        "(",
        optional(
          seq(
            seq($.expression, ","),
            repeat(seq($.expression, ",")),
            optional($.expression),
          ),
        ),
        ")",
      ),

    array_expr: ($) =>
      seq(
        "[",
        optional(
          seq($.expression, repeat(seq(",", $.expression)), optional(",")),
        ),
        "]",
      ),

    list_expr: ($) =>
      seq(
        "list!",
        "[",
        optional(
          seq($.expression, repeat(seq(",", $.expression)), optional(",")),
        ),
        "]",
      ),

    type_alias: ($) => seq("type", field("definition", $.alias_name), "=", $.ty, ";"),

    ty: ($) =>
      choice(
        field("reference", $.alias_name),
        $.builtin_alias,
        $.sum_type,
        $.option_type,
        $.unsigned_type,
        $.tuple_type,
        $.array_type,
        $.list_type,
        $.bool_type
      ),

    alias_name: ($) => /[a-zA-Z][a-zA-Z0-9_]*/,

    bool_type: ($) => "bool",

    builtin_alias: ($) =>
      choice(
        "Ctx8",
        "Pubkey",
        "Message64",
        "Message",
        "Signature",
        "Scalar",
        "Fe",
        "Gej",
        "Ge",
        "Point",
        "Height",
        "Time",
        "Distance",
        "Duration",
        "Lock",
        "Outpoint",
        "Confidential1",
        "ExplicitAsset",
        "Asset1",
        "ExplicitAmount",
        "Amount1",
        "ExplicitNonce",
        "Nonce",
        "TokenAmount1",
      ),

    sum_type: ($) => seq("Either", "<", $.ty, ",", $.ty, ">"),
    option_type: ($) => seq("Option", "<", $.ty, ">"),
    unsigned_type: ($) =>
      choice("u128", "u256", "u16", "u32", "u64", "u1", "u2", "u4", "u8"),
    tuple_type: ($) =>
      seq(
        "(",
        optional(seq(seq($.ty, ","), repeat(seq($.ty, ",")))),
        optional($.ty),
        ")",
      ),

    array_type: ($) => seq("[", $.ty, ";", /\d+/, "]"),
    list_type: ($) => seq("List<", $.ty, ",", /\d+/, ">"),

    module: ($) =>
      seq(
        "mod",
        choice("witness", "param"),
        "{",
        repeat(seq($.module_assign, ";")),
        "}",
      ),

    module_assign: ($) =>
      seq("const", $.witness_name, ":", $.ty, "=", $.expression),


    witness_name: ($) => /[a-zA-Z][a-zA-Z0-9_]*/,
    identifier: ($) => /[a-zA-Z][a-zA-Z0-9_]*/,

    jet: ($) => seq("jet", "::", $.function_name),
    witness_expr: ($) => seq("witness", "::", $.witness_name),
    param_expr: ($) => seq("param", "::", $.witness_name),

    type_cast: ($) => seq("<", $.ty, ">", "::", "into"),
    fold: ($) => seq("fold", "::", "<", field("reference", $.function_name), ",", /\d+/, ">"),
    array_fold: ($) => seq("array_fold", "::", "<", field("reference", $.function_name), ",", /\d+/, ">"),
    for_while: ($) => seq("for_while", "::", "<", field("reference", $.function_name), ">"),


    unwrap_left: ($) => seq("unwrap_left", "::", "<", $.ty, ">"),
    unwrap_right: ($) => seq("unwrap_right", "::", "<", $.ty, ">"),

    variable_expr: ($) => field("reference", $.identifier),

    bin_literal: ($) => /0b[01_]+/,
    hex_literal: ($) => /0x[0-9a-fA-F_]+/,
    dec_literal: ($) => /[0-9_]+/,
  },
});
