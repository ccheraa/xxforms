<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>
  
  <!-- style -->
  
  <xsl:template match="/" mode="style" priority="10">
    <xsl:if test="exists(//xx:chart)">
      <style>chart</style>
    </xsl:if>
    <xsl:next-match />
  </xsl:template>

  <!-- model -->

  <xsl:template match="/" mode="model" priority="10">
    <chart>
      <xsl:for-each select="//xx:chart">
        <xsl:element name="{xx:id(.)}">
          <margin-x>20</margin-x>
          <margin-y>20</margin-y>
          <gap>4</gap>
          <width>400</width>
          <height>300</height>
          <y-start>15</y-start>
          <y-end>90</y-end>
        </xsl:element>
      </xsl:for-each>
    </chart>
    <xsl:next-match />
  </xsl:template>
  
  <!-- controls -->
  
  <xsl:template match="xx:chart">
    <xsl:variable name="id">
      <xsl:value-of select="(@id, xx:id(.))[1]"/>
    </xsl:variable>
    <xsl:variable name="margin-x">
      <xsl:value-of select="(@margin-x, concat('instance(''xxforms'')/chart/', $id, '/margin-x'))[1]"/>
    </xsl:variable>
    <xsl:variable name="margin-y">
      <xsl:value-of select="(@margin-y, concat('instance(''xxforms'')/chart/', $id, '/margin-y'))[1]"/>
    </xsl:variable>
    <xsl:variable name="gap">
      <xsl:value-of select="(@gap, concat('instance(''xxforms'')/chart/', $id, '/gap'))[1]"/>
    </xsl:variable>
    <xsl:variable name="width">
      <xsl:value-of select="(@width, concat('instance(''xxforms'')/chart/', $id, '/width'))[1]"/>
    </xsl:variable>
    <xsl:variable name="height">
      <xsl:value-of select="(@height, concat('instance(''xxforms'')/chart/', $id, '/height'))[1]"/>
    </xsl:variable>
    <xsl:variable name="y-start">
      <xsl:value-of select="(@y-start, concat('instance(''xxforms'')/chart/', $id, '/y-start'))[1]"/>
    </xsl:variable>
    <xsl:variable name="y-end">
      <xsl:value-of select="(@y-end, concat('instance(''xxforms'')/chart/', $id, '/y-end'))[1]"/>
    </xsl:variable>
    <xsl:variable name="data">
      <xsl:value-of select="(@data, concat('instance(''xxforms'')/chart/', $id, '/data'))[1]"/>
    </xsl:variable>
    <div class="xx-chart">
        <xsl:attribute name="id" select="$id" />
      <svg xmlns="http://www.w3.org/2000/svg">
        <xsl:attribute name="width" select="concat('{', $width, '}')" />
        <xsl:attribute name="height" select="concat('{', $height, '}')" />
        <xsl:attribute name="viewBox" select="concat('0 0 {', $width, '} {', $height, '}')" />
        <rect width="{{{$width} + 1}}" height="{{{$height} + 1}}" fill="var(--xxforms-chart-background)" />
          <g class="xx-chart-bars" fill="var(--xxforms-chart-bar-color)">
            <xf:repeat id="bar">
              <xsl:attribute name="ref" select="$data" />
              <g class="xx-entry">
                <rect class="xx-bar"
                x="{{{$margin-x} + {$gap} + ((position() - 1) * ({$width} - {$margin-x} * 2 - {$gap}) div count({$data}))}}"
                y="{{{$margin-y} + (1 - (@value - {$y-start}) div ({$y-end} - {$y-start})) * ({$height} - {$margin-y} * 2)}}"
                width="{{({$width} - {$margin-x} * 2 - {$gap}) div count({$data}) - {$gap}}}"
                height="{{((@value - {$y-start}) div ({$y-end} - {$y-start})) * ({$height} - {$margin-y} * 2)}}" />

              <text class="xx-value"
                x="{{{$margin-x} + {$gap} + ((position() - 0.5) * ({$width} - {$margin-x} * 2 - {$gap}) div count({$data})) - {$gap} div 2}}"
                y="{{{$margin-y} + (1 - (@value - {$y-start}) div ({$y-end} - {$y-start})) * ({$height} - {$margin-y} * 2) - {$gap}}}"
                text-anchor="middle"
                alignment-baseline="middle"
                font-size="10"
                fill="var(--xxforms-chart-value-color)"><xf:output value="@value"/></text>

              <text class="xx-label"
                x="{{{$margin-x} + {$gap} + ((position() - 0.5) * ({$width} - {$margin-x} * 2 - {$gap}) div count({$data})) - {$gap} div 2}}"
                y="{{{$height} - {$margin-y} div 2}}"
                text-anchor="middle"
                alignment-baseline="middle"
                font-size="10"
                fill="var(--xxforms-chart-label-color)"><xf:output value="@label"/></text>
            </g>
          </xf:repeat>
        </g>
        <line class="xx-chart-y-axis" stroke="var(--xxforms-chart-axis-color)"
          x1="{{{$margin-x}}}"
          y1="{{{$margin-y}}}"
          x2="{{{$margin-x}}}"
          y2="{{{$height} - {$margin-y}}}"
        />
        <line class="xx-chart-x-axis" stroke="var(--xxforms-chart-axis-color)"
          x1="{{{$margin-x}}}"
          y1="{{{$height} - {$margin-y}}}"
          x2="{{{$width} - {$margin-x}}}"
          y2="{{{$height} - {$margin-y}}}"
        />
      </svg>
    </div>
  </xsl:template>
 
</xsl:stylesheet>