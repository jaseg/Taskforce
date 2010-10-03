<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" encoding="utf-8" indent="yes"/>
	<xsl:variable name="langpath">lang/</xsl:variable>
	<xsl:variable name="language">de</xsl:variable>
	<xsl:template match="text">
		<xsl:variable name="from" select="."/>
		<xsl:variable name="translation" select="document('lang/de.xml')/translations/translation[from=$from]/to"/>
		<xsl:choose>
			<xsl:when test="string-length($translation) > 0">
				<xsl:value-of select="$translation"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="."/>
			</xsl:otherwise>
		</xsl:choose>
		<!--/translation[@from={$./text()}]-->
		<!--xsl:value-of select="."/-->
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
