const cmdProfileInput = require("../../../schemas/cmd-profile-input.json");
const sweBodelningProfileInput = require("../../../schemas/swe-bodelning-profile-input.json");

const cmdProfileKey = cmdProfileInput.properties.jurisdiction_profile_key.const;
const sweBodelningProfileKey =
  sweBodelningProfileInput.properties.jurisdiction_profile_key.const;

const jurisdictionProfileRegistry = Object.freeze({
  [sweBodelningProfileKey]: Object.freeze({
    jurisdiction_profile_key: sweBodelningProfileKey,
    capabilities: Object.freeze({
      profile_inputs: true,
      release_eval: true,
      profile_dossier: true,
      export_package: true,
      export_package_json_artifact: true,
      export_package_markdown_artifact: true,
      export_package_pdf_artifact: true,
      export_package_docx_artifact: true,
      export_package_bundle_manifest: true,
      export_package_bundle_archive_artifact: true,
    }),
  }),
  [cmdProfileKey]: Object.freeze({
    jurisdiction_profile_key: cmdProfileKey,
    capabilities: Object.freeze({
      profile_inputs: true,
      release_eval: true,
      profile_dossier: true,
      export_package: true,
      export_package_json_artifact: true,
      export_package_markdown_artifact: true,
      export_package_pdf_artifact: true,
      export_package_docx_artifact: true,
      export_package_bundle_manifest: true,
      export_package_bundle_archive_artifact: true,
    }),
  }),
});

function getJurisdictionProfileRegistryEntry(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return jurisdictionProfileRegistry[jurisdictionProfileKey] ?? null;
}

function isSupportedJurisdictionProfileKey(jurisdictionProfileKey) {
  const entry = getJurisdictionProfileRegistryEntry(jurisdictionProfileKey);

  return (
    entry !== null &&
    Object.values(entry.capabilities).some((capabilityEnabled) => capabilityEnabled === true)
  );
}

function hasJurisdictionProfileCapability(jurisdictionProfileKey, capability) {
  if (typeof capability !== "string" || capability.length === 0) {
    return false;
  }

  return (
    getJurisdictionProfileRegistryEntry(jurisdictionProfileKey)?.capabilities[
      capability
    ] === true
  );
}

module.exports = {
  getJurisdictionProfileRegistryEntry,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
  jurisdictionProfileRegistry,
};
