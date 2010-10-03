<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="utf-8" indent="yes"/>
	<xsl:variable name="langpath">lang/</xsl:variable>
	<xsl:variable name="language">de</xsl:variable>
	<xsl:template match="text">
		<!--xsl:value-of select="document('{$langpath}{$language}.xml')/translations/translation[@from={$./text()}]"/-->
	</xsl:template>
	<xsl:template match="js">
		<script language="javascript" type="text/javascript">
			<xsl:value-of select="."/>
		</script>
	</xsl:template>
	<xsl:template match="/body">
		<html>
			<head>
				<link rel="stylesheet" type="text/css" href="style.css"/>
				<script language="javascript" type="text/javascript" src="jquery-1.4.2.js">
				</script>
			</head>
			<body>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
</xsl:stylesheet>
