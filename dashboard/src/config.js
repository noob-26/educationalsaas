const config = {
  // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "",
  defaultPath: "/dashboard/default",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};

// export const API_SERVICE = "https://educationsaasapi.herokuapp.com/api/v1/main";
export const API_SERVICE = "http://localhost:5000/api/v1/main";

export default config;
