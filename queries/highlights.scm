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
(bool_type) @type.builtin

(alias_name) @type

[
  "None"
  "Some"
  "Left"
  "Right"
] @type.builtin

; Modules
[
  "jet"
  "witness"
  "param"
 ] @module

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


