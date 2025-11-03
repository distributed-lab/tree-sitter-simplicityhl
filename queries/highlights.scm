; Comments
(comment) @comment

; Keywords
[
  "fn"
  "let"
  "const"
  "type"
  "match"
  "mod"
] @keyword

; Types
(unsigned_type) @type.builtin
(builtin_alias) @type.builtin
(sum_type) @type.builtin
(option_type) @type.builtin
(tuple_type) @type.builtin
(array_type) @type.builtin
(list_type) @type.builtin
(alias_name) @type

[
  "bool"
  "None"
  "Some"
  "Left"
  "Right"
] @type

; Modules
(jet_keyword) @module
(witness_keyword) @module
(param_keyword) @module

; Functions
[
  "unwrap_left"
  "unwrap_right"
  "is_none"
  "unwrap"
  "assert!"
  "panic!"
  "dbg!"
  "fold"
  "array_fold"
  "for_while"
  "list!"
  "into"
] @function.builtin

(function_name) @function

; Variables and identifiers
(identifier) @variable
(witness_name) @constant

; Literals
(bin_literal) @number
(hex_literal) @number
(dec_literal) @number
[
  "false"
  "true"
] @number

(function_params) @variable.parameter

; Brackets and delimiters
[
  ","
  ";"
  ":"
  "="
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
  "<"
  ">"
] @punctuation.bracket

"::" @punctuation.special

; Operators (if you want extra highlighting for these)
[
  "=>"
] @operator


