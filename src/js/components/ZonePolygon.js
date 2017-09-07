import React from 'react'
import PropTypes from 'prop-types'
import { Polygon, Tooltip} from 'react-leaflet'
import { PieChart, Pie, Cell } from 'recharts'

import { getStatus } from '../SpecialFunctions'

const COLORS = {
  alerts: '#ed2a20',
  warnings: '#FFC511',
  normal: '#50E3C2'
}

function ZonePolygon(props) {
  return (
    <Polygon
      color="#666"
      fillColor="#fff"
      weight={1}
      positions={props.zone.positions}
      fillOpacity={props.highlightedZone === props.zone._id ? 0.7 : 0.4}
      onMouseOver={() => props.onMouseOver(props.zone._id)}
      onMouseOut={() => props.onMouseOut(null)}
    >
      <Tooltip permanent opacity={1} >
        <div className={`tooltip ${props.highlightedZone === props.zone._id ? 'active' : ''}`}>
          <div className="hidable">
            {
              props.zone.status
              ? <PieChart width={70} height={70}>
                <Pie
                  dataKey="value"
                  data={getStatus(props.zone.status).completeStatus}
                  outerRadius={35}
                  innerRadius={28}
                  startAngle={90}
                  endAngle={-270}
                  fill=""
                  isAnimationActive={false}
                >
                { getStatus(props.zone.status).completeStatus.map((status, index) => <Cell key={index} fill={COLORS[status.name]} />) }
                </Pie>
              </PieChart>
              : null
            }
          </div>
          <div className="general"><h3>{props.zone.name}</h3></div>
          {/* <span className="hidable">{getStatus(status).normalPercentage * 100}%</span> */}
        </div>
      </Tooltip>
    </Polygon>
  )
}

ZonePolygon.propTypes = {
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  highlightedZone: PropTypes.string,
  zone: PropTypes.object.isRequired
}

export default ZonePolygon