export const generateAssetsBuildPaths = (chunk: any) => {
  const name = chunk?.name;
  const isCSS = name && /\.css$/.test(name);
  const isSVG = name && /\.svg$/.test(name);
  const isFont = name && /\.(ttf|woff|woff2|eot)$/.test(name);
  const isImage = name && /\.(png|jpg|gif|jpeg|ico)$/.test(name);

  if (isCSS) return "css/[name].css";
  if (isSVG) return "icons/[name].svg";
  if (isFont) return "fonts/[name].[extname]";
  if (isImage) return "images/[name].[extname]";

  return "[ext]/[name].[extname]";
};
