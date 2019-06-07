/* ******************************************************
 * |`````-_  |      | |`-_    | |`-_    | |````` |````-_
 * |    _-`  |      | |   `_  | |   `_  | |----  |    _-`
 * |```-_    |      | |     `_| |     `_| |      |````-_
 * |     `-_  `- . -` |       | |       | |_____ |      `-
 *********************************************************/
/***********************************************************/
// -----------------------run()----------------------------
// *******************************************************//
!(global => {
  const spanLine = (a, b = "", c = "</span>") =>
    '<span class="' + a + '">' + b + c;
  const stringhtml = (...a) => a.join(""),
    regulateArray = a => {
      var array = [];
      if (Array.isArray(a)) {
        for (let i = 0; i < a.length; i++) {
          array.push(a[i]);
        }
        return array;
      }
      return a;
    };
  let logline = spanLine("log-line", "log-> "),
    showbutton = spanLine("show-btns"),
    advancedinfo = spanLine("advancedinfo", "type: "),
    constructorinfo = spanLine("advancedinfo", "constructor: "),
    propertyleft = spanLine("property-left margin----left", "", ""),
    property_right = spanLine("property-right", "", "");
  const typeOf = (a, b, c) => {
      b === undefined && (b = "");
      c === undefined && (c = "");
      return stringhtml(
        logline,
        c,
        showbutton,
        '<div class="show-additional">',
        spanLine("log-type-of", "", ""),

        advancedinfo,
        typeof a,
        "</span><br>",
        spanLine("log-constructor", "", ""),
        constructorinfo,
        a.constructor
          .toString()
          .slice(0, a.constructor.toString().indexOf("{")),
        "</span>",

        b,
        " </div>"
      );
    },
    pushmethods = (a, b = a, c = spanLine("f", " <em> f</em>  ( ) ")) =>
      propertyleft + a + ": </span>" + property_right + b + c + "</span><br>",
    getMethodsFor_one = a => {
      let niz = [];
      let ab = Object.getPrototypeOf(a);
      var outputHTMLblock = [
        stringhtml(
          propertyleft,
          "constructor: </span>",
          property_right,
          Object.getPrototypeOf(a)
            .constructor.toString()
            .replace("{ [native code] }", "{ ... }"),
          "</span><br>"
        )
      ];
      let cde = Object.getOwnPropertyNames(ab);
      cde.forEach(i => {
        if (i !== "constructor" && typeof cde[i] === "function") {
          niz.push(i);
        }
      });
      for (let i = 0; i < niz.length; i++) {
        outputHTMLblock.push(spanLine("method-triangle"), pushmethods(niz[i]));
      }
      outputHTMLblock.push('<span class="advancedinfo">__proto__: null</span>');
      return outputHTMLblock.join("");
    },
    getMethodsFor_all = (a, b) => {
      let proto = [],
        ab = Object.getPrototypeOf(a),
        constructors = [],
        outputHTMLblock = "";
      while (ab) {
        let cde = Object.getOwnPropertyNames(ab);
        cde.forEach(i => {
          if (i !== "constructor" && typeof ab[i] === "function") {
            proto.push(
              stringhtml(
                spanLine("method-triangle function-" + i),

                pushmethods(i),
                '<div class="show-additionals">'
              ),
              "</div>"
            );
          }
          if (
            typeof ab[i] !== "function" &&
            i !== "length" &&
            i !== "__proto__"
          ) {
            proto.push(
              propertyleft,
              i,
              ": </span>",
              property_right,
              ab[i],
              "</span><br>"
            );
          }
        });
        if (!b) {
          ab.__proto__
            ? constructors.push(Object.getPrototypeOf(ab).constructor.name)
            : constructors.push(Object.prototype.constructor.name);
        } else {
          constructors.push(ab.constructor.name);
        }
        ["Array", "String"].indexOf(ab.constructor.name) >= 0 &&
          proto.push(pushmethods("length </span>", 0, ""));
        outputHTMLblock += stringhtml(
          spanLine("advancedinfo", "__proto__: "),
          spanLine("func", "", ""),
          constructors[constructors.length - 1]
            .toString()
            .slice(0, ab.constructor.toString().indexOf("{"))
            .replace("function", "")
            .replace("()", ""),
          "</span>",
          showbutton,
          '<div class="show-additional">',
          propertyleft,
          "constructor: </span>",
          property_right,
          ab.constructor
            .toString()
            .slice(0, ab.constructor.toString().indexOf("{")),
          "</span><br>",
          proto.join("")
        );

        ab = Object.getPrototypeOf(ab);
        proto = [];
      }

      outputHTMLblock +=
        '<span class="advancedinfo">__proto__: null</span></div>';
      return outputHTMLblock;
    },
    getfmethd = (a, property) => {
      let abcde = Object.getOwnPropertyNames(Function.prototype);
      let niz = [];
      let niz2 = [];
      let outputHTMLblock = [];
      let later = ["caller", "calee", "arguments", "constructor"];
      for (let i = 0; i < abcde.length; i++) {
        if (
          later.indexOf(abcde[i]) === -1 &&
          typeof Function.prototype[abcde[i]] === "function"
        ) {
          niz.push(abcde[i]);
        } else {
          niz2.push(abcde[i]);
        }
      }
      niz2 = niz2.filter(i => i !== "constructor");
      if (a === "methods") {
        for (let i = 0; i < niz.length; i++) {
          outputHTMLblock.push(
            stringhtml(
              spanLine("method-triangle function-"),
              propertyleft,
              niz[i],
              ": </span>",
              property_right,
              niz[i],
              spanLine("f", " <em> f</em>  ( ) "),
              "</span><br>"
            )
          );
        }
        return outputHTMLblock.join("");
      }
      if (a === "properties") {
        for (let i = 0; i < niz2.length; i++) {
          outputHTMLblock.push(
            stringhtml(
              propertyleft,
              niz2[i],
              ": </span>",
              property_right,
              property[niz2[i]],
              "</span><br>"
            )
          );
        }
        outputHTMLblock.push(
          propertyleft,
          "prototype: </span>",
          showbutton,
          '<div class="show-additional">',
          (() => {
            let n = "";
            Object.getOwnPropertyNames(property.prototype).forEach(i => {
              n +=
                spanLine("method-triangle function-" + i) +
                  propertyleft +
                  i +
                  "</span>" +
                  ": " +
                  property_right +
                  typeof property.prototype[i] ===
                "function"
                  ? property.prototype[i]
                      .toString()
                      .slice(0, property.prototype[i].toString().indexOf("{")) +
                    spanLine("f", " <em> f</em>  ( ) ")
                  : property.prototype[i];
              +"</span><br>";
            });

            return n;
          })(),
          "</div><br>"
        );
        return outputHTMLblock.join("");
      }
      if (a === "Function__proto__") {
        let name = (Function.prototype["name"] = " "
          ? '""'
          : Function.prototype["name"]);
        return stringhtml(
          propertyleft,
          "caller: </span>",
          property_right,
          "null</span><br>",
          propertyleft,
          "arguments: </span>",
          property_right,
          "null</span><br>",
          propertyleft,
          "length: </span>",
          property_right,
          Function.prototype["length"],
          "</span><br>",
          propertyleft,
          "name: </span>",
          property_right,
          name,
          "</span><br>"
        );
      }
    },
    isFunction = a => {
      let stringToConcat = "";
      stringToConcat += typeOf(
        a,
        stringhtml(
          "<br>",
          getfmethd("properties", a),
          spanLine("advancedinfo", "__proto__: "),
          spanLine("func", "func  ()"),
          showbutton,
          '<div class="show-additional">',
          propertyleft,
          "constructor: </span>",
          property_right,
          a.constructor.toString().replace("{ [native code] }", "{ ... }"),
          "</span><br>",
          getfmethd("methods"),
          getfmethd("Function__proto__"),
          spanLine("advancedinfo", "__proto__: "),
          spanLine("func", "Object"),
          showbutton,
          '<div class="show-additional">',
          getMethodsFor_one(a.prototype),
          " </div>",
          " </div>"
        ),
        a
      );
      return stringToConcat;
    },
    getArray_Values = (a, b) => {
      let stringToConca = "",
        c1 = b
          ? propertyleft +
            "length: </span>" +
            property_right +
            a.length +
            "<br>"
          : "",
        fun,
        t,
        tt;
      stringToConca += c1;
      var abc = Object.getOwnPropertyNames(a).filter(i => i !== "__proto__");
      abc.forEach(i => {
        let c =
          typeof a[i] === "object"
            ? getObjectlogs(a[i])
            : typeof a[i] === "string"
            ? spanLine("log-" + typeof a[i], '"' + a[i] + '"')
            : spanLine("log-" + typeof a[i], a[i]);

        if (a.hasOwnProperty(i) && i !== "length" && i !== "constructor") {
          if (typeof a[i] === "function") {
            fun = ' <span class="f"><em> f</em>  ( ) </span>';
            t = 0;
            tt = function(o) {
              return o
                .toString()
                .slice(0, c.toString().indexOf("{"))
                .replace("{ [native code] }", "")
                .replace("function " + i + "() ", i);
            };
          } else {
            fun = "";

            tt = function(o) {
              return o;
            };
          }
          stringToConca += pushmethods(i, tt(c), fun);
        }
      });
      return stringToConca;
    },
    getObjectlogs_i = (a, b) => {
      return '<span class="log-' + typeof a + '">' + b;
    },
    getObjectlogs = a => {
      a = regulateArray(a);
      if (!a) {
        return a;
      }
      let e,
        o,
        n,
        tt,
        x = "";
      if (Array.isArray(a)) {
        e = '<span class="o">(' + a.length + ") [</span>";

        o = spanLine("o", "]");
        n = _ => {
          return "";
        };
      } else {
        e =
          '<span class="o">' +
          (a ? a.constructor.name : "") +
          " </span>" +
          spanLine("o", "{");
        o = spanLine("o", "}");
        n = _ => {
          return '<span class="object-propert">' + _ + ": </span>";
        };
        tt = Object.getOwnPropertyNames(a)
          .splice(-1)
          .pop();
      }
      let aa = "</span>" + spanLine("o", ",") + "";
      let stringToConcat = e;
      if (a.constructor.name === "Number" || a.constructor.name === "Boolean")
        stringToConcat += a;
      for (let i in a) {
        (i > Object.keys(a).length - 2 ||
          i === 0 ||
          (!Array.isArray(a) && i === tt)) &&
          (aa = "");

        if (a.hasOwnProperty(i)) {
          let e =
            typeof a[i] !== "object" && typeof a[i] !== "string" ? a[i] : "";

          if (typeof a[i] === "string") {
            stringToConcat +=
              n(i) + getObjectlogs_i(a[i], '"' + a[i] + '"') + aa;
          } else {
            stringToConcat += n(i) + getObjectlogs_i(a[i], e) + aa;
          }
          if (typeof a[i] === "object") {
            stringToConcat += getObjectlogs(a[i]) + aa;
          }
        }
      }
      stringToConcat = stringToConcat.replace(
        /<span class="log-object"><\/span><span class="o">,<\/span>/gi,
        ""
      );
      stringToConcat += o;
      return stringToConcat;
    },
    isObjectorisArray = (a, b, e) => {
      let stringToConcat = "";
      let t = b === "array";
      stringToConcat += typeOf(
        a,
        stringhtml(
          "<br>",
          getArray_Values(a, t),
          getMethodsFor_all(a, e),
          " </div>",
          " </div>"
        ),
        getObjectlogs(a)
      );
      return stringToConcat;
    },
    /*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */
    writeRUNjs = (a, e) => {
      return '<div class="log log-' + e + '">' + a + "</div>";
    };
  // run()
  global.run = function() {
    let output = "",
      arg;

    for (let i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      let n = typeof arg;

      if (n == "object" && arg && arg.length > 1000) {
        // large objects only
        output = writeRUNjs(logline + JSON.stringify(arg), n);
      } else {
        switch (n) {
          case "undefined":
            output += writeRUNjs(logline + arg, n);
            break;
          case "string":
          case "boolean":
          case "number":
            output += writeRUNjs(typeOf(arg, undefined, arg), n);
            break;
          case "function":
            output += writeRUNjs(isFunction(arg), n);
            break;

          case "object": //this also includes null
            if (arg === null) {
              output += writeRUNjs(logline + arg, n);
            } else if (arg === window) {
              output += writeRUNjs(logline + arg, n);
            } else if (
              Array.isArray(arg) ||
              ["Number", "String", "Boolean"].indexOf(arg.constructor.name) >= 0
            ) {
              let tt =
                arg.constructor.name === "Array" ||
                arg.constructor.name === "String"
                  ? "array"
                  : "other";
              output += writeRUNjs(isObjectorisArray(arg, tt, true), n);
            } else {
              output += writeRUNjs(isObjectorisArray(arg, "object", false), n);
            }
            break;
          case "symbol":
            output += writeRUNjs(logline + "Symbol([optional])", n);
            break;
          default:
            output += writeRUNjs(logline + arg, n);
        }
      }
    }
    //html

    document.querySelector(".inner-output-cont").innerHTML += output;
    console.log.apply(undefined, arguments);
    return "don't log me :*";
  };
  (() => {
    window.onerror = (msg, url, linenumber) => {
      document.querySelector(".inner-output-cont").innerHTML =
        '<span class="error errors">Error: </span>' +
        '<span class="error_message errors">' +
        msg +
        '<br><span class="line-error">-> at line: ' +
        linenumber +
        "</span></span>";
      return true;
    };
  })();
  // rewrite document write()
  document.write = n => {
    document.querySelector(".inner-output-cont").innerHTML +=
      '<span class="write">' + JSON.stringify(n) + "</span>";
  };

  //run() is available from textarea
  // and whole window
})(window);
// :*
