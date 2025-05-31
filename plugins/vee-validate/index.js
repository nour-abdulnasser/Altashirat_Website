import { defineRule, configure } from "vee-validate";
import {
  required,
  min,
  max,
  regex,
  email,
  alpha,
  numeric,
  confirmed
} from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  // Define basic rules
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("regex", regex);
  defineRule("alpha", alpha);
  defineRule("confirmed", confirmed);
  defineRule("numeric", numeric);

  // Define special characters rule
  defineRule("special", (value) => {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (!value || !specialChars.test(value)) {
      return false;
    }
    return true;
  });

  // Define file validation rules
  defineRule("min_files", (value, [min]) => {
    if (!value || !Array.isArray(value) || value.length < min) {
      return false;
    }
    return true;
  });

  defineRule("max_files", (value, [max]) => {
    if (value && Array.isArray(value) && value.length > max) {
      return false;
    }
    return true;
  });

  defineRule("max_size", (value, [size]) => {
    if (value && Array.isArray(value)) {
      return value.every(file => file.size / 1024 <= size);
    }
    return true;
  });

  // Get i18n instance
  const { $i18n } = useNuxtApp();

  // Configure validation
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
    generateMessage: (ctx) => {
      try {
        // Get the field name from i18n
        let fieldName = "";
        try {
          // Handle nested fields like 'phone.number'
          const fieldPath = ctx.field.includes('.')
            ? ctx.field.split('.').join('.')
            : ctx.field;

          fieldName = $i18n.t(`fields.${fieldPath}`);

          // If translation returns the key itself, try a direct field lookup
          if (fieldName === `fields.${fieldPath}`) {
            fieldName = $i18n.t(`fields.${ctx.field}`);
          }

          // If still no match, use the field name as-is
          if (fieldName === `fields.${ctx.field}`) {
            fieldName = ctx.field;
          }
        } catch (e) {
          fieldName = ctx.field;
        }

        // Prepare parameters for message
        const params = {
          field: fieldName,
        };

        // Add rule-specific params
        if (ctx.rule?.params) {
          if (ctx.rule.name === "min" || ctx.rule.name === "max") {
            params[ctx.rule.name] = Array.isArray(ctx.rule.params)
              ? ctx.rule.params[0]
              : ctx.rule.params;
          } else if (ctx.rule.name === "min_files") {
            params.min_files = Array.isArray(ctx.rule.params)
              ? ctx.rule.params[0]
              : ctx.rule.params;
          } else if (ctx.rule.name === "max_files") {
            params.max_files = Array.isArray(ctx.rule.params)
              ? ctx.rule.params[0]
              : ctx.rule.params;
          } else if (ctx.rule.name === "max_size") {
            params.max_size = Array.isArray(ctx.rule.params)
              ? ctx.rule.params[0]
              : ctx.rule.params;
          }
        }

        // Get the message using i18n
        const translationKey = `validation.${ctx.rule.name}`;

        try {
          // Use i18n to translate the message
          const message = $i18n.t(translationKey, params);

          // Check if translation exists
          if (message !== translationKey) {
            return message;
          }
        } catch (e) {
          console.error('Translation error:', e);
        }

        // Fallback messages
        switch (ctx.rule.name) {
          case "min_files":
            return `${fieldName} requires at least ${params.min_files} file(s)`;
          case "max_files":
            return `${fieldName} allows up to ${params.max_files} file(s)`;
          case "max_size":
            return `${fieldName} files must be ${params.max_size}KB or smaller each`;
          default:
            return `${fieldName} is invalid`;
        }
      } catch (error) {
        console.error('Validation message error:', error);
        return `${ctx.field} is invalid`;
      }
    },
  });

  return {
    provide: {
      veeValidate: true,
    },
  };
});