#version 300 es
precision highp float;

//TODO: Modify as needed

in vec4 v_color;
in vec2 v_texcoord;
in vec4 v_motion;

layout(location=0) out vec4 color;
layout(location=1) out vec4 motion; // Send the motion vectors here

uniform vec4 tint;
uniform sampler2D texture_sampler;

void main(){
    color = texture(texture_sampler, v_texcoord) * v_color * tint; // Send our interpolated color
    motion = v_motion;
}