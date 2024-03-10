import { Helmet } from "react-helmet";

const ResourceHelper = () => {
  return (
    <Helmet>
      {/* Import CSS */}
      <link
        rel="stylesheet"
        href="/assets/vendor/bootstrap/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
      />
      <link rel="stylesheet" href="/assets/css/style.css" />

      {/* Import JavaScript */}
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/js/main.js"></script>
    </Helmet>
  );
};

export default ResourceHelper;
